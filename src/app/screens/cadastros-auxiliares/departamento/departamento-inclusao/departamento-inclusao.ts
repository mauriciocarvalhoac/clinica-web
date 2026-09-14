import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractComponent } from '../../../abstract-component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartamentoService } from '../../../../service/departamento-service';
import { EnumSituacao } from '../../../../model/enum/enum-situacao';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MsgUtil } from '../../../../shared/utilitario/msg.-util';

@Component({
  selector: 'tab-departamento-inclusao',
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './departamento-inclusao.html',
  styleUrl: './departamento-inclusao.scss',
})
export class DepartamentoInclusao extends AbstractComponent implements OnInit, OnDestroy {

  formularioDepartamento!: FormGroup;
  serviceDepartamento = inject(DepartamentoService);
  subscription !: Subscription;

  enumSituacao = EnumSituacao.values();

  constructor() {
    super();

  }

  ngOnInit(): void {
    this.formularioDepartamento = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.required, Validators.maxLength(100)]],
      situacao: [null, [Validators.required]],
    });

    this.subscription = this.serviceDepartamento.notification$.subscribe((id: any) => {
      if (id) {
        this.serviceDepartamento.buscarPorId(id).subscribe((obj) => {
          this.formularioDepartamento.setValue(obj)

          console.log(JSON.stringify(this.formularioDepartamento.value))
        })
      }
    })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  salvar() {
    if (this.formularioDepartamento.invalid) {
      this.alert.alertWarning('Preencha os campos obrigatórios');
      this.formularioDepartamento.markAllAsTouched();
      return;
    }
    console.log(this.formularioDepartamento.get('id')?.value)
    if (this.formularioDepartamento.get('id')?.value) {
      this.serviceDepartamento.atualizar(this.formularioDepartamento.get('id')?.value, this.formularioDepartamento.value).subscribe({
        next: (response) => {
          this.alert.alertInfo(MsgUtil.atualizar_sucesso);
          this.formularioDepartamento.reset();
          this.serviceDepartamento.notificarAtualizacao();
        },
        error: (error) => {
          this.alert.alertDanger(error?.error?.message || 'Erro ao atualizar departamento. Tente novamente mais tarde.');
        }

      });
    } else {
      this.serviceDepartamento.salvar(this.formularioDepartamento.value)
        .subscribe({
          next: (response) => {
            this.alert.alertInfo(MsgUtil.salvar_sucesso);
            this.serviceDepartamento.notificarAtualizacao();
            this.formularioDepartamento.reset();
          },
          error: (error) => {
            this.alert.alertDanger(error?.error?.message || 'Erro ao salvar departamento. Tente novamente mais tarde.');
          }
        });
    }
  }

  cancelar() {
    this.formularioDepartamento.reset();
  }
}
