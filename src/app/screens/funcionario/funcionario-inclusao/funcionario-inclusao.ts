import { Component, inject, OnInit } from '@angular/core';
import { AbstractComponent, CrudEnum } from '../../abstract-component';
import { FuncionarioService } from '../../../service/funcionario-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { EspecialidadeService } from '../../../service/especialidade-service';
import { EnumGenero } from '../../../model/enum/enum-genero';
import { EnumEstados } from '../../../model/enum/enum-estado';
import { EnumPais } from '../../../model/enum/enum-pais';
import { EnumSituacaoFormacaoEducacional } from '../../../model/enum/enum-situacao-formacao-educacional';
import { Validator } from '../../../shared/validator/validator';
import { MsgUtil } from '../../../shared/utilitario/msg.-util';
import { EnumFuncao } from '../../../model/enum/enum-funcao';
import { EnumSituacao } from '../../../model/enum/enum-situacao';
import { CepService } from '../../../service/cep-service';

@Component({
  selector: 'app-funcionario-inclusao',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NgxMaskDirective, NgbNavModule],
  templateUrl: './funcionario-inclusao.html',
  styleUrl: './funcionario-inclusao.scss',
})
export class FuncionarioInclusao extends AbstractComponent implements OnInit {

  formularioMedico!: FormGroup;
  activeTab = 1;

  service = inject(FuncionarioService);
  serviceEspecialidade = inject(EspecialidadeService);
  serviceCep = inject(CepService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  enumGeneros = EnumGenero.values();
  enumEstados = EnumEstados.values();
  enumPaises = EnumPais.values();
  enumSituacaoFormacao = EnumSituacaoFormacaoEducacional.values();
  enumSituacao = EnumSituacao.values();
  enumFuncao = EnumFuncao.values();
  listaEspecialidades: any[] = [];

  get medicoEspecialidades(): FormArray {
    return this.formularioMedico.get('medicoEspecialidades') as FormArray;
  }

  constructor() {
    super();
    this.isCRUD = "C";
    this.listarEspecialidades();
  }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');

    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.maxLength(250)]],
      cpf: [null, [Validators.required]],
      rg: [null],
      dataNascimento: [null, [Validators.required, Validator.dateOfBirth]],
      genero: [null],
      paisOrigem: [null],
      email: [null, [Validators.required, Validators.maxLength(100), Validators.email,]],
      celular: [null, [Validators.required]],
      telefone: [null],
      funcao: [null, [Validators.required]],
      departamento: [null, [Validators.required]],
      matricula: [null, [Validators.required]],

      endereco: this.formBuilder.group({
        cep: [null],
        logradouro: [null],
        numero: [null],
        bairro: [null],
        cidade: [null],
        estado: [null],
        complemento: [null],
      }),
      medico: [null],
    });

    this.formularioMedico = this.formBuilder.group({
      crm: [null, [Validators.required, Validators.pattern('^[0-9]{4,10}$')]],
      rqe: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(7), Validators.pattern('^[0-9]{4,7}$')]],
      crmEstado: [null, [Validators.required]],
      crmSituacao: [null, [Validators.required]],
      especialidade: [null],
      instituicaoGraduacao: [null],
      situacaoPos: [null],
      instituicaoPos: [null],
      situacaoMestrado: [null],
      instituicaoMestrado: [null],
      situacaoDoutorado: [null],
      instituicaoDoutorado: [null],
      medicoEspecialidades: this.formBuilder.array([], Validators.required),
    });

    if (id) {
      this.isCRUD = "R";
      this.service.buscarPorId(id).subscribe((obj: any) => {
        console.log("OBJETO FUNCIONARIO: " + JSON.stringify(obj));
        this.formulario.patchValue(obj);
        if (obj.medico) {
          this.formularioMedico.patchValue(obj.medico);
          if (obj.medico.medicoEspecialidades != null) {
            obj.medico.medicoEspecialidades.forEach((esp: any) => {
              this.medicoEspecialidades.push(this.groupEspecialidade(esp))
            });
          }
        }
        this.isCRUD = CrudEnum.U.toString();
      });
    }

    this.valueChangesSituacaoPos();
    this.valueChangesSituacaoMestrado();
    this.valueChangesSituacaoDoutorado();
  }

  salvar() {

    if (this.formulario.invalid || this.formularioMedico.invalid && this.formulario.get('funcao')?.value === 'MED') {
      this.formulario.markAllAsTouched();
      if (this.formulario.get('funcao')?.value === 'MED')
        this.formularioMedico.markAllAsTouched();
      this.alert.alertWarning(MsgUtil.validar_campos_obrigatorios);
      return;
    }

    if (this.formulario.get('funcao')?.value === 'MED') {
      this.formulario.get('medico')?.setValue(this.formularioMedico.value);
    } else {
      this.formulario.get('medico')?.setValue(null);
    }

    if (this.formulario.get('funcao')?.value === 'MED' && this.medicoEspecialidades.length === 0) {
      this.alert.alertWarning("Pelo menos uma Especialidade precisa ser adicionada ao Médico.");
      return;
    }

    if (this.medicoEspecialidades.controls.length > 0) {
      if (this.medicoEspecialidades.controls.every(control => !control.get('situacao')?.value)) {
        this.alert.alertWarning("Pelo menos uma Especialidade precisa estar com situação ativa.");
        return;
      }

      if (this.medicoEspecialidades.controls.every(control => !control.get('principal')?.value)) {
        this.alert.alertWarning("Pelo menos uma Especialidade precisa estar como Especialidade Principal.");
        return;
      }
    }

    if (this.formulario.value.id) {
      this.service.editar(this.formulario.value).subscribe({
        next: () => {
          this.router.navigate(['/funcionario-listagem']);
          this.alert.alertInfo("Alterado com sucesso!!");
        },
        error: (error) => {
          this.alert.alertDanger(error.error.message);
        }
      });
    } else {
      this.service.salvar(this.formulario.value).subscribe({
        next: () => {
          this.alert.alertInfo(MsgUtil.salvar_sucesso);
          this.router.navigate(['/funcionario-listagem']);
        },
        error: (error) => {
          this.alert.alertDanger(error.error.message);
        }
      });
    }
  }

  limpar() {
    this.formulario.reset();
  }

  cancelar() {
    this.service.buscarPorId(this.formulario.value.id).subscribe((obj: any) => {
      this.formulario.patchValue(obj);
      this.formulario.disable();
      this.isCRUD = CrudEnum.R.toString();
    });
  }

  habilitarCampos() {
    this.isCRUD = CrudEnum.U.toString();
    this.formulario.enable();
  }

  listarEspecialidades() {
    this.serviceEspecialidade.listarAtivas().subscribe((especialidades: any) => {
      this.listaEspecialidades = especialidades;
    });
  }

  adicionarEspecialidade() {
    const idEspecialidadeSelecionada = this.formularioMedico.value.especialidade;

    if (!idEspecialidadeSelecionada) {
      this.alert.alertWarning("Escolha uma especialidade.");
      return;
    }

    const jaAdicionado = this.medicoEspecialidades.controls.some(control => {
      const group = control.get('especialidade');
      return group?.get('id')?.value == idEspecialidadeSelecionada;
    });

    console.log(jaAdicionado)
    if (jaAdicionado) {
      this.alert.alertWarning("Especialidade já adicionada.");
      return;
    }

    const especialidadeEncontrada = this.listaEspecialidades.find((esp) => esp.id == idEspecialidadeSelecionada);

    this.medicoEspecialidades.push(
      this.formBuilder.group({
        id: null,
        principal: this.medicoEspecialidades.length === 0,
        situacao: true,
        especialidade: this.formBuilder.group({
          id: especialidadeEncontrada?.id,
          descricao: especialidadeEncontrada.descricao,
        })
      })
    );

    this.formularioMedico.get('especialidade')?.reset();
  }

  removerEspecialidade(i: any) {
    this.medicoEspecialidades.removeAt(i);
  }

  consultarEspecialidade() {
    this.listaEspecialidades.forEach((especialidade: any) => {
      if (especialidade.id == this.formulario.value.especialidade) {
        this.medicoEspecialidades.push(
          this.groupEspecialidade(especialidade)
        );
      } else {
        console.log("Especialidade não encontrada");
      }
    });
  }

  groupEspecialidade(medEsp: any) {
    return this.formBuilder.group({
      id: [medEsp.id ? medEsp.id : null],
      principal: [medEsp.principal, [Validators.required]],
      situacao: [medEsp.situacao],
      especialidade: this.formBuilder.group({
        id: [medEsp.especialidade.id],
        descricao: [`${medEsp.especialidade.descricao.toUpperCase()}  -  CBO: (${medEsp.especialidade.cbo})  -  TISS: (${medEsp.especialidade.tiss}) - RQE: (${medEsp.especialidade.rqe})`],
      }),
    });
  }

  definirPrincipal(i: any) {
    const isSituacaoControl = this.medicoEspecialidades.at(i).get('situacao');
    if (!isSituacaoControl?.value) {
      this.alert.alertWarning("Essa especialidade não pode ser a principal, pois ela está inativa.")
      return;
    }

    this.medicoEspecialidades.controls.forEach((control, index) => {
      const isPrincipalControl = control.get('principal');

      // Define true apenas para o índice clicado, false para o resto
      isPrincipalControl?.setValue(index === i);

    });
  }

  definirSituacao(index: any) {
    let isSituacaoControl = this.medicoEspecialidades.at(index);
    if (isSituacaoControl.get('situacao')) {
      isSituacaoControl.get('situacao')?.setValue(!isSituacaoControl.get('situacao')?.value)
    }

    if (!isSituacaoControl.get('situacao')?.value) {
      console.log("Situação falsa o pripaipal tambem")
      isSituacaoControl.get('principal')?.setValue(false)
    }

  }

  onChangeFuncao() {
    if (this.formulario.get('funcao')?.value == 'MED') {
      this.formularioMedico.enable();
    } else {
      this.formularioMedico.disable();
    }
  }

  onConsultarCEP() {
    if (this.formulario.get('endereco')?.get('cep')?.value?.length == 8) {
      this.serviceCep.consultarCep(this.formulario.get('endereco')?.get('cep')?.value).subscribe({
        next: (value) => {
          console.log("Cep Consultado: " + JSON.stringify(value))
          this.formulario.get("endereco")?.patchValue({
            cep: value?.cep,
            estado: value?.uf,
            bairro: value?.bairro,
            cidade: value?.localidade,
            logradouro: value?.logradouro,
          })
        },
        error(err) {

        },
      });
    }
  }

  valueChangesSituacaoPos() {
    this.formularioMedico.get('situacaoPos')?.valueChanges.subscribe((situacao) => {
      const campoInstituicao = this.formularioMedico.get('instituicaoPos');
      if (situacao === null || situacao === 'null' || situacao === "N") {
        campoInstituicao?.disable();
        campoInstituicao?.setValue('');
      } else {
        campoInstituicao?.enable();
      }
    });
  }
  valueChangesSituacaoMestrado() {
    this.formularioMedico.get('situacaoMestrado')?.valueChanges.subscribe((situacao) => {
      const campoInstituicao = this.formularioMedico.get('instituicaoMestrado');
      if (situacao === null || situacao === 'null' || situacao === "N") {
        campoInstituicao?.disable();
        campoInstituicao?.setValue('');
      } else {
        campoInstituicao?.enable();
      }
    });
  }
  valueChangesSituacaoDoutorado() {
    this.formularioMedico.get('situacaoDoutorado')?.valueChanges.subscribe((situacao) => {
      const campoInstituicao = this.formularioMedico.get('instituicaoDoutorado');
      if (situacao === null || situacao === 'null' || situacao === "N") {
        campoInstituicao?.disable();
        campoInstituicao?.setValue('');
      } else {
        campoInstituicao?.enable();
      }
    });
  }
} 
