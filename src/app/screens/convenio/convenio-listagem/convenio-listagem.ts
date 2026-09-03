import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AbstractComponent } from '../../abstract-component';
import { EnumSituacao } from '../../../model/enum/enum-situacao';
import { ConvenioService } from '../../../service/convenio-service';
import { MsgUtil } from '../../../shared/utilitario/msg.-util';

@Component({
  selector: 'app-convenio-listagem',
  imports: [RouterLink, ReactiveFormsModule,],
  templateUrl: './convenio-listagem.html',
  styleUrl: './convenio-listagem.scss',
})
export class ConvenioListagem extends AbstractComponent implements OnInit {
  service = inject(ConvenioService);

  lista = signal<any>([]);
  enumSituacao = EnumSituacao.values();

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      nomeFantasia: [null],
      situacao: [null],
    });
  }

  constructor() {
    super();
    this.listar();
  }

  listar() {
    this.service.listar().subscribe({
      next: (value) => {
        this.lista.set(value);
      },
      error: (err) => {
        console.error(err.error.message);
      },
    });
  }

  excluir(id: any) {
    this.modal.confirmDelete().subscribe((result) => {
      if (result) {
        this.service.excluir(id).subscribe({
          next: (value) => {
            this.alert.alertInfo(MsgUtil.excluir_sucesso);
            this.listar();
          },
          error: (err) => {
            this.alert.alertDanger(MsgUtil.excluir_falha);
          },
        });
      }
    });

  }

  filtrar() {
    this.service.filtrar(this.formulario.get('nomeFantasia')?.value, this.formulario.get('situacao')?.value).subscribe({
      next: (response) => {
        console.log(response)
        this.lista.set(response);
      },
      error: (error) => {
        this.alert.alertDanger(MsgUtil.filtrar_falha);
      },
    });
  }

  limpar() {
    this.formulario.reset();
    this.listar();
  }

  navigateTo(rota: string, id: any) {
    this.irParaRota.navigate([rota, id]);
  }
}
