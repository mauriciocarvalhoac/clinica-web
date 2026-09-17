import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AbstractComponent } from '../../../abstract-component';
import { DepartamentoService } from '../../../../service/departamento-service';
import { EnumSituacao } from '../../../../model/enum/enum-situacao';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MsgUtil } from '../../../../shared/utilitario/msg.-util';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tab-departamento-listagem',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './departamento-listagem.html',
  styleUrl: './departamento-listagem.scss',
})
export class DepartamentoListagem extends AbstractComponent implements OnInit, OnDestroy {

  // formularioDepartamento!: FormGroup;

  inscricaoNotificacao !: Subscription;

  serviceDepartamento = inject(DepartamentoService);
  enumSituacao = EnumSituacao.values();
  lista = signal<any>([]);

  constructor() {
    super();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
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
    this.serviceDepartamento.filtrar(this.formulario.get('descricao')?.value, this.formulario.get('situacao')?.value).subscribe({
      next: (value: any[]) => {
        this.lista.set(value);
      },
      error: (error) => {

      },
    });
  }

  limpar() {
    this.formulario.reset();
    this.listar();
  }

  excluir(id: any) {
    this.modal.confirmDelete().subscribe((isDeleted) => {
      if (isDeleted) {
        this.serviceDepartamento.excluir(id).subscribe({
          next: (value: any) => {
            this.alert.alertInfo(MsgUtil.excluir_sucesso);
            this.listar();
          },
          error: (error) => {

          },
        });
      }
    });
  }

  navigateTo(rota: string, id: any) {
    this.irParaRota.navigate([rota, id]);
  }
}
