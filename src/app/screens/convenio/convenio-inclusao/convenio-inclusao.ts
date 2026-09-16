import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AbstractComponent, CrudEnum } from '../../abstract-component';
import { CommonModule } from '@angular/common';
import { EnumSituacao } from '../../../model/enum/enum-situacao';
import { ConvenioService } from '../../../service/convenio-service';
import { MsgUtil } from '../../../shared/utilitario/msg.-util';
import { routes } from '../../../app.routes';
import { NgxMaskDirective } from "ngx-mask";
import { EnumAbrangencia } from '../../../model/enum/enum-abrangencia';
import { EnumAcomodacao } from '../../../model/enum/enum-acomodacao';

@Component({
  selector: 'app-convenio-inclusao',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './convenio-inclusao.html',
  styleUrl: './convenio-inclusao.scss',
})
export class ConvenioInclusao extends AbstractComponent implements OnInit {

  service = inject(ConvenioService);
  activatedRoute = inject(ActivatedRoute);
  enumSituacao = EnumSituacao.values();
  enumAcomodacao = EnumAcomodacao.values();
  enumAbrangencia = EnumAbrangencia.values();
  formularioPlano!: FormGroup;

  get planosArray() {
    return this.formulario.get('planos') as FormArray;
  }

  constructor() {
    super();
  }

  ngOnInit(): void {
    var id = this.activatedRoute.snapshot.paramMap.get('id');

    this.formulario = this.formBuilder.group({
      id: [null],
      razaoSocial: [null, [Validators.required, Validators.maxLength(250)]],
      nomeFantasia: [null, [Validators.required, Validators.maxLength(250)]],
      cnpj: [null, [Validators.required]],
      situacao: [null, [Validators.required]],
      registroAns: [null, [Validators.required, Validators.maxLength(20)]],
      telefone: [null],
      email: [null, [Validators.email]],

      planos: this.formBuilder.array([], Validators.required)
    });

    this.formularioPlano = this.formBuilder.group({
      id: [],
      descricao: [null, [Validators.required, Validators.maxLength(50)]],
      codigoAns: [null, [Validators.required, Validators.maxLength(20)]],
      acomodacao: [null, [Validators.required]],
      abrangencia: [null, [Validators.required]],
      situacao: [null, [Validators.required]],
    });

    if (id) {
      this.service.buscarPorId(id).subscribe({
        next: (obj: any) => {
          console.log(JSON.stringify(obj));
          this.formulario.patchValue(obj);

          this.planosArray.clear();
          obj.planos.forEach((plano: any) => {
            this.planosArray.push(
              this.formBuilder.group({
                id: [plano.id],
                descricao: [plano.descricao],
                codigoAns: [plano.codigoAns],
                acomodacao: [plano.acomodacao],
                abrangencia: [plano.abrangencia],
                situacao: [plano.situacao],
              })
            );
          });

          this.isCRUD = CrudEnum.U.toString();
        },
        error: (error: any) => {
        }
      })
    }
  }

  salvar() {
    console.log(JSON.stringify(this.formulario.value));

    if (this.formulario.get('email')?.errors?.['email']) {
      this.alert.alertWarning(MsgUtil.email_invalid);
      return;
    }

    if (this.formulario.invalid || (this.formularioPlano.invalid && this.formularioPlano.get('planos')?.value?.length > 0)) {
      this.formulario.markAllAsTouched();
      if (this.formularioPlano.get('planos')?.value?.length > 0)
        this.formularioPlano.markAllAsTouched();
      this.alert.alertWarning(MsgUtil.validar_campos_obrigatorios);
      return;
    }

    if (this.formulario.get('id')?.value) {
      this.service.atualizar(this.formulario.get('id')?.value, this.formulario.value).subscribe({
        next: (obj: any) => {
          this.alert.alertInfo(MsgUtil.atualizar_sucesso);
          this.irParaRota.navigate(["/convenio-listagem"]);
        },
        error: (error: any) => {

        }
      });
    } else {
      this.service.salvar(this.formulario.value).subscribe({
        next: (obj: any) => {
          this.alert.alertInfo(MsgUtil.salvar_sucesso);
          this.irParaRota.navigate(["/convenio-listagem"]);
        },
        error: (error: any) => {
          this.alert.alertDanger(error.error.message);
        }
      });
    }
  }

  cancelar() {
    if (this.formulario.value.id) {
      this.service.buscarPorId(this.formulario.value.id).subscribe((obj: any) => {
        this.formulario.patchValue(obj);
        this.formulario.disable();
        this.formularioPlano.disable();
        this.isCRUD = CrudEnum.R.toString();
      });
    }
  }

  limpar() {
    this.formulario.reset();
  }

  habilitarCampos() {
    this.formulario.enable();
    this.isCRUD = CrudEnum.U.toString();
  }

  adicionarPlano() {
    if (this.formularioPlano.invalid) {
      this.formularioPlano.markAllAsTouched();
      this.alert.alertWarning(MsgUtil.validar_campos_obrigatorios);
      return;
    }

    this.planosArray.push(
      this.formBuilder.group({
        id: [this.formularioPlano.value.id],
        descricao: [this.formularioPlano.value.descricao, [Validators.required]],
        codigoAns: [this.formularioPlano.value.codigoAns, [Validators.required]],
        acomodacao: [this.formularioPlano.value.acomodacao, [Validators.required]],
        abrangencia: [this.formularioPlano.value.abrangencia, [Validators.required]],
        situacao: [this.formularioPlano.value.situacao, [Validators.required]],
      })
    );

    this.formularioPlano.reset();
  }

  removerPlano = (index: number) => this.planosArray.removeAt(index);

  planoForm(): any {
    return
  }

}

