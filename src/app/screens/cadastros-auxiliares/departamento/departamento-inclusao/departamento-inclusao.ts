import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractComponent } from '../../../abstract-component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartamentoService } from '../../../../service/departamento-service';
import { EnumSituacao } from '../../../../model/enum/enum-situacao';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MsgUtil } from '../../../../shared/utilitario/msg.-util';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'tab-departamento-inclusao',
  imports: [ReactiveFormsModule, CommonModule, RouterLink,],
  templateUrl: './departamento-inclusao.html',
  styleUrl: './departamento-inclusao.scss',
})
export class DepartamentoInclusao extends AbstractComponent implements OnInit {

  serviceDepartamento = inject(DepartamentoService);
  activatedRoute = inject(ActivatedRoute);

  enumSituacao = EnumSituacao.values();

  constructor() {
    super();
  }

  ngOnInit(): void {
    var id = this.activatedRoute.snapshot.paramMap.get('id');

    this.formulario = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.required, Validators.maxLength(100)]],
      situacao: [null, [Validators.required]],
    });

    if (id) {
      this.serviceDepartamento.buscarPorId(id).subscribe((obj) => {
        this.formulario.setValue(obj);
      })
    }

  }

  salvar() {
    if (this.formulario.invalid) {
      this.alert.alertWarning('Preencha os campos obrigatórios');
      this.formulario.markAllAsTouched();
      return;
    }
    if (this.formulario.get('id')?.value) {
      this.serviceDepartamento.atualizar(this.formulario.get('id')?.value, this.formulario.value).subscribe({
        next: (response) => {
          this.irParaRota.navigate(["/departamento-listagem"]);
          this.alert.alertInfo(MsgUtil.atualizar_sucesso);
          this.formulario.reset();
        },
        error: (error) => {
          this.alert.alertDanger(error?.error?.message || 'Erro ao atualizar departamento. Tente novamente mais tarde.');
        }

      });
    } else {
      this.serviceDepartamento.salvar(this.formulario.value)
        .subscribe({
          next: (response) => {
            this.irParaRota.navigate(["/departamento-listagem"]);
            this.alert.alertInfo(MsgUtil.salvar_sucesso);
            this.formulario.reset();
          },
          error: (error) => {
            this.alert.alertDanger(error?.error?.message || 'Erro ao salvar departamento. Tente novamente mais tarde.');
          }
        });
    }
  }

  cancelar() {
    this.formulario.reset();
  }

  limpar() {
    this.formulario.reset();
  }

}
