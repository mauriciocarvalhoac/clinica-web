import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractComponent } from '../../abstract-component';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AgendaService } from '../../../service/agenda-service';
import { NgxMaskDirective } from 'ngx-mask';
import { MsgUtil } from '../../../shared/utilitario/msg.-util';
import { disabled } from '@angular/forms/signals';
import { FuncionarioService } from '../../../service/funcionario-service';
import { EnumDia } from '../../../model/enum/enum-dia';
import { Validator } from '../../../shared/validator/validator';
import { ConvenioService } from '../../../service/convenio-service';
import { EspecialidadeService } from '../../../service/especialidade-service';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-agenda-inclusao',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgxMaskDirective],
  templateUrl: './agenda-inclusao.html',
  styleUrl: './agenda-inclusao.scss',
})
export class AgendaInclusao extends AbstractComponent implements OnInit {

  formAgenda!: FormGroup;
  router = inject(Router);
  route = inject(ActivatedRoute);

  service = inject(AgendaService);
  serviceMedico = inject(FuncionarioService);
  serviceConvenio = inject(ConvenioService);
  serviceEspecialidade = inject(EspecialidadeService);

  enumDias = EnumDia.values();
  listaMedicos: any[] = [];
  listaConvenios = signal<any>([]);
  listaEspecialidades = signal<any>([]);

  get atendimentosArray() {
    return this.formulario.get('atendimentos') as FormArray;
  }

  get conveniosArray() {
    return this.formulario.get('convenios') as FormArray;
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.inicializarMedicos();
    this.inicializarConvenios();
    this.escolherEspecialidadeByMedico();

    this.formulario = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.required]],
      duracao: [null, [Validators.required]],
      funcionario: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      especialidade: this.formBuilder.group({
        id: [null, [Validators.required]]
      }),
      sala: [null],

      modalidadeParticular: [false],
      valorConsultaParticular: [null],
      modalidadeConvenio: [false],
      convenios: this.formBuilder.array([]),

      atendimentos: this.formBuilder.array([]),
    });

    this.formAgenda = this.formBuilder.group({
      dia: [null, [Validators.required]],
      horaIni: [null, [Validators.required]],
      intervaloIni: [null],
      intervaloFim: [null],
      horaFim: [null, [Validators.required]],
    }, { validators: Validator.cronogramaHorariosAgenda })

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.buscarPorId(id).pipe(delay(1000)).subscribe({
        next: (obj) => {
          // console.log("Dados da Agenda", JSON.stringify(obj));

          this.formulario.patchValue({
            id: obj.id,
            descricao: obj.descricao,
            duracao: obj.duracao,
            funcionario: {
              id: obj?.funcionario?.id
            },
            especialidade: {
              id: obj.especialidade?.id,
              descricao: obj.especialidade?.descricao,
            },
            sala: obj.sala,
            modalidadeParticular: obj.modalidadeParticular,
            valorConsultaParticular: obj.valorConsultaParticular,
            modalidadeConvenio: obj.modalidadeConvenio,
          });

          if (obj.convenios) {
            const idsConvenios = obj.convenios.map((c: any) => c.id) || [];
            this.conveniosArray.controls?.forEach((c: any) => {
              if (idsConvenios.includes(c.get("id")?.value)) {
                c.get("selecionado")?.setValue(true);
              }
            });
          }
          if (obj.atendimentos)
            obj.atendimentos?.forEach((a: any) => {
              this.atendimentosArray.push(
                this.formBuilder.group({
                  id: [a?.id],
                  dia: [a?.dia],
                  horaIni: [a?.horaIni],
                  intervaloIni: [a?.intervaloIni],
                  intervaloFim: [a?.intervaloFim],
                  horaFim: [a?.horaFim],
                })
              );
            });
          this.atendimentosArray.disable();
        },
      });

      this.valueChangesModalidadeConvenio();
      this.valueChangesChooseProfissionalMedico();
    }
  }

  valueChangesChooseProfissionalMedico() {
    this.formulario.get('funcionario')?.get("id")?.valueChanges.subscribe((id) => {
      if (id)
        this.serviceMedico.buscarEspecialidadeByMedico(id).subscribe({
          next: (value) => {
            const medicoEspecialidades = value?.medico?.medicoEspecialidades ?? [];
            this.listaEspecialidades.set([]);

            if (medicoEspecialidades.length > 0) {
              for (let i of medicoEspecialidades) {
                this.listaEspecialidades.set([...this.listaEspecialidades(), i?.especialidade]);
              }
            } else {
              this.alert.alertWarning("Esse médico não possui uma especialidade associada.");
            }
          },
          error: (error) => {
            this.alert.alertWarning(error.error.message || MsgUtil.INTERNAL_SERVER_ERROR);
          },
        });
    });
  }

  valueChangesModalidadeConvenio() {
    this.formulario.get('modalidadeConvenio')?.valueChanges.subscribe((ativo) => {
      if (ativo) {
        this.conveniosArray.enable();
      } else {
        this.conveniosArray.disable();
        // this.conveniosArray.reset();
      }
    });
  }

  inicializarConvenios() {
    this.serviceConvenio.listar().subscribe({
      next: (lista) => {
        // this.conveniosArray.clear();

        lista.forEach((convenio: any) => {
          this.conveniosArray.push(
            this.formBuilder.group({
              id: [convenio?.id],
              nomeFantasia: [convenio?.nomeFantasia],
              selecionado: [{ value: false, disabled: true }]
            }));
        });
        // console.log("Convenios", JSON.stringify(this.conveniosArray.value), this.conveniosArray.value.length);
      },
      error: (error) => {

      },
    });
  }

  inicializarMedicos() {
    this.serviceMedico.listarMedicos().subscribe({
      next: (medicos: any[]) => {
        console.log("Medicos e as escialidade", JSON.stringify(medicos))
        this.listaMedicos = medicos
      },
      error: (error) => {

      },
    });
  }

  listarEspecialidades() {
    this.serviceEspecialidade.listarAtivas().subscribe({
      next: (value) => {
        this.listaEspecialidades.set(value);
      },
      error: (error) => {
        this.alert.alertWarning(error.error.message || MsgUtil.INTERNAL_SERVER_ERROR);
      }
    })
  }

  escolherEspecialidadeByMedico() {
    this.listaEspecialidades.set([]);

    var funcionarioID = this.formulario?.get("funcionario")?.get("id")?.value;
    console.log("Escolhido")
    this.listaMedicos.forEach((medico: any) => {
      if (medico.id === funcionarioID) {
        medico?.medicoEspecialidades.forEach((esp: any) => {
          this.listaEspecialidades.set([esp]);
          this.formulario.get("especialidade")?.patchValue(esp)
        });
      }

    })


  }


  adicionarAtendimento() {
    if (this.formAgenda.hasError('horaInicioMaiorQueHoraFim')) {
      this.formAgenda.markAllAsTouched();
      this.alert.alertWarning("Hora Início está maior que a hora fim.");
      return;
    }

    if (this.formAgenda.hasError('intervaloForaDoHorario') || this.formAgenda.hasError('intervaloIniMaiorQueIntervaloFim')) {
      this.formAgenda.markAllAsTouched();
      this.alert.alertWarning("Intervalo está incorreto.");
      return;
    }

    if (this.formAgenda.invalid) {
      this.formAgenda.markAllAsTouched();
      this.alert.alertWarning(MsgUtil.validar_campos_obrigatorios);
      return;
    }

    const atendimento = this.formAgenda.getRawValue();

    this.atendimentosArray.push(
      this.formBuilder.group({
        dia: [atendimento?.dia],
        horaIni: [atendimento?.horaIni],
        intervaloIni: [atendimento?.intervaloIni],
        intervaloFim: [atendimento?.intervaloFim],
        horaFim: [atendimento?.horaFim],
      })
    )

    this.formAgenda.reset();
    this.atendimentosArray.disable()
  }

  habilitarAtendimento(index: number) {
    this.atendimentosArray.at(index).enable()
  }

  desabilitarAtendimento(index: number) {
    this.atendimentosArray.at(index).disable()
  }

  excluirAtendimento(index: any) {
    this.atendimentosArray.removeAt(index)
  }

  salvar() {
    const dadosFormulario = this.formulario.getRawValue();

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.alert.alertWarning(MsgUtil.validar_campos_obrigatorios);
      return;
    }

    const conveniosSelecionados = dadosFormulario.convenios
      .filter((convenio: any) => convenio.selecionado === true)
      .map((convenio: any) => ({
        id: convenio.id,
        nomeFantasia: convenio.nomeFantasia,
      }));

    const payload = {
      id: dadosFormulario?.id,
      descricao: dadosFormulario?.descricao,
      duracao: dadosFormulario?.duracao,
      funcionario: dadosFormulario?.funcionario,
      especialidade: dadosFormulario?.especialidade,
      sala: dadosFormulario?.sala,
      modalidadeParticular: dadosFormulario?.modalidadeParticular,
      valorConsultaParticular: dadosFormulario?.valorConsultaParticular,
      modalidadeConvenio: dadosFormulario?.modalidadeConvenio,
      convenios: conveniosSelecionados.length > 0 ? conveniosSelecionados : [],
      atendimentos: dadosFormulario?.atendimentos,
    };

    if (this.formulario.get('id')?.value) {
      this.service.atualizar(this.formulario.get('id')?.value, payload).subscribe({
        next: (obj: any) => {
          this.alert.alertInfo(MsgUtil.atualizar_sucesso);

          this.formulario.reset();
          this.formAgenda.reset();

          this.router.navigate(['/agenda-listagem']);
        },
        error: (error) => {
          this.alert.alertDanger(error.error.message || MsgUtil.salvar_falha);
        },
      });
    } else {
      this.service.salvar(payload).subscribe({
        next: (value) => {
          this.alert.alertInfo(MsgUtil.salvar_sucesso);

          this.formulario.reset();
          this.formAgenda.reset();

          this.router.navigate(['/agenda-listagem']);
        },
        error: (value) => {
          this.alert.alertDanger(MsgUtil.salvar_falha);
        },
      });
    }
  }

  changeModalidadeParticular() {
    console.log("modalidadeParticular", this.formulario.get("modalidadeParticular")?.value)

    if (this.formulario.get("modalidadeParticular")?.value) {
      this.formulario.get("valorConsultaParticular")?.enable();
    } else {
      this.formulario.get("valorConsultaParticular")?.disable();
      this.formulario.get("valorConsultaParticular")?.setValue(null);
    }

  }

}
