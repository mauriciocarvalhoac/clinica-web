import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AbstractComponent, CrudEnum } from '../../abstract-component';
import { CommonModule } from '@angular/common';
import { EnumSituacao } from '../../../model/enum/enum-situacao';
import { ConvenioService } from '../../../service/convenio-service';
import { MsgUtil } from '../../../shared/utilitario/msg.-util';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-convenio-inclusao',
  imports: [RouterLink, ReactiveFormsModule, CommonModule,],
  templateUrl: './convenio-inclusao.html',
  styleUrl: './convenio-inclusao.scss',
})
export class ConvenioInclusao extends AbstractComponent implements OnInit {
  service = inject(ConvenioService);
  activatedRoute = inject(ActivatedRoute);
  enumSituacao = EnumSituacao.values();

  ngOnInit(): void {
    var id = this.activatedRoute.snapshot.paramMap.get('id');

    this.formulario = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.required]],
      situacao: [null, [Validators.required]],
    });

    if (id) {
      this.service.buscarPorId(id).subscribe({
        next: (obj: any) => {
          this.formulario.patchValue(obj);
        },
        error: (error: any) => {

        }
      })
    }
  }


  constructor() {
    super();

  }

  salvar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
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

        }
      });
    }
  }

  cancelar() {
    throw new Error('Method not implemented.');
  }

  limpar() {
    this.formulario.reset();
  }

}
