import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AbstractComponent } from '../../../abstract-component';
import { DepartamentoService } from '../../../../service/departamento-service';
import { EnumSituacao } from '../../../../model/enum/enum-situacao';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MsgUtil } from '../../../../shared/utilitario/msg.-util';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tab-departamento-listagem',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './departamento-listagem.html',
  styleUrl: './departamento-listagem.scss',
})
export class DepartamentoListagem extends AbstractComponent implements OnInit, OnDestroy {
  formularioDepartamento!: FormGroup;

  inscricaoNotificacao !: Subscription;

  serviceDepartamento = inject(DepartamentoService);
  enumSituacao = EnumSituacao.values();
  lista = signal<any>([]);

  constructor() {
    super();
  }

  ngOnInit() {
    this.formularioDepartamento = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.maxLength(100)]],
      situacao: [null],
    });

    this.listar();

    this.inscricaoNotificacao = this.serviceDepartamento.notification$.subscribe(() => {
      this.listar();
    });
  }

  ngOnDestroy(): void {
    this.inscricaoNotificacao.unsubscribe();
  }

  listar() {
    this.serviceDepartamento.listar().subscribe({
      next: (value) => {
        this.lista.set(value);
      },
      error: (error) => {

      },
    });
  }

  filtrar() {
    this.serviceDepartamento.filtrar(this.formularioDepartamento.get('descricao')?.value, this.formularioDepartamento.get('situacao')?.value).subscribe({
      next: (value: any[]) => {
        this.lista.set(value);
      },
      error: (error) => {

      },
    });
  }

  excluir(id: any) {
    this.modal.confirmDelete().subscribe((isDeleted) => {
      if (isDeleted) {
        this.serviceDepartamento.excluir(id).subscribe({
          next: (value: any) => {
            this.serviceDepartamento.notificarAtualizacao();
            this.alert.alertInfo(MsgUtil.excluir_sucesso)
          },
          error: (error) => {

          },
        });
      }
    });
  }

}
