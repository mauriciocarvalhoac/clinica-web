import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MedicoService } from '../../../service/medico-service';
import { NgxMaskDirective } from 'ngx-mask';
import { AbstractComponent } from '../../abstract-component';
import { CommonModule } from '@angular/common';
import { NgbAlert, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Validator } from '../../../shared/validator/validator';
import { EnumGenero } from '../../../model/enum/enum-genero';
import { EnumEstados } from '../../../model/enum/enum-estado';
import { EnumPais } from '../../../model/enum/enum-pais';
import { MsgUtil } from '../../../shared/utilitario/msg.-util';
import { EspecialidadeService } from '../../../service/especialidade-service';
import { form } from '@angular/forms/signals';
import { EnumSituacaoFormacaoEducacional } from '../../../model/enum/enum-situacao-formacao-educacional';

@Component({
  selector: 'app-medico-inclusao',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NgxMaskDirective, NgbNavModule,],
  templateUrl: './medico-inclusao.html',
  styleUrl: './medico-inclusao.scss',
})
export class MedicoInclusao extends AbstractComponent implements OnInit {

  activeTab = 1;
  service = inject(MedicoService);
  serviceEspecialidade = inject(EspecialidadeService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  enumGeneros = EnumGenero.values();
  enumEstados = EnumEstados.values();
  enumPaises = EnumPais.values();
  enumSituacaoFormacao = EnumSituacaoFormacaoEducacional.values();
  listaEspecialidades: any[] = [];

  get medicoEspecialidades(): FormArray {
    return this.formulario.get('medicoEspecialidades') as FormArray;
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
      endereco: this.formBuilder.group({
        cep: [null],
        logradouro: [null],
        numero: [null],
        bairro: [null],
        cidade: [null],
        estado: [null],
      }),

      subEspecialidade: [null],
      crm: [null],
      crmEstado: [null],
      instituicaoGraduacao: [null],
      statusPos: [null],
      instituicaoPos: [null],
      statusMestrado: [null],
      instituicaoMestrado: [null],
      statusDoutorado: [null],
      instituicaoDoutorado: [null],

      medicoEspecialidades: this.formBuilder.array([]),
      especialidade: [null],
    });

    if (id) {
      this.isCRUD = "R";
      this.service.buscarPorId(id).subscribe((medico: any) => {
        this.formulario.patchValue(medico);
        if (medico.medicoEspecialidades != null)
          medico.medicoEspecialidades.forEach((esp: any) => {
            this.medicoEspecialidades.push(this.groupEspecialidade(esp))
          });
        this.formulario.disable();
      });
    }
  }

  salvar() {
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

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.alert.alertWarning(MsgUtil.validar_campos_obrigatorios);
      return;
    }

    if (this.formulario.value.id) {
      this.service.editar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/medico-listagem']);
        this.alert.alertInfo("Alterado com sucesso!!");
      }, (error) => {
        this.alert.alertDanger(error.error.message);
      });
    } else {
      this.service.salvar(this.formulario.value).subscribe(() => {
        this.alert.alertInfo(MsgUtil.salvar_sucesso);
        this.router.navigate(['/medico-listagem']);
      }, (error) => {
        this.alert.alertDanger(error.error.message);
      });
    }
  }

  limpar() {
    this.formulario.reset();
  }

  cancelar() {
    this.service.buscarPorId(this.formulario.value.id).subscribe((medico: any) => {
      this.formulario.patchValue(medico);
      this.formulario.disable();
      this.isCRUD = "R";
    });
  }

  habilitarCampos() {
    this.isCRUD = "U";
    this.formulario.enable();
  }

  listarEspecialidades() {
    this.serviceEspecialidade.listar().subscribe((especialidades: any) => {
      console.log(especialidades);
      this.listaEspecialidades = especialidades;
    });
  }

  adicionarEspecialidade() {
    const idEspecialidadeSelecionada = this.formulario.value.especialidade;
    console.log("Esp Selecionada: " + idEspecialidadeSelecionada)
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

    this.formulario.get('especialidade')?.reset();
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
        descricao: [`${medEsp.especialidade.descricao.toUpperCase()}  -  CBO: (${medEsp.especialidade.cbo})  -  TISS: (${medEsp.especialidade.tiss})`]
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

      console.log("se der certo a definicao de principal")
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
} 