import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AbstractComponent } from '../../abstract-component';
import { AgendaService } from '../../../service/agenda-service';
import { MsgUtil } from '../../../shared/utilitario/msg.-util';

@Component({
  selector: 'app-agenda-listagem',
  imports: [RouterModule, ReactiveFormsModule,],
  templateUrl: './agenda-listagem.html',
  styleUrl: './agenda-listagem.scss',
})
export class AgendaListagem extends AbstractComponent implements OnInit {
  service = inject(AgendaService);
  lista = signal<any>([]);

  constructor() {
    super();
    this.formulario = this.formBuilder.group({
      descricao: [null],
    })
    this.listar();
  }

  listar() {
    this.service.listar().subscribe({
      next: (callback: any[]) => {
        this.lista.set(callback);
      },
      error: (error) => {
        this.alert.alertDanger(error.error.message);
      },
    })
  }

  ngOnInit(): void {
  }

  filtrar() {

  }

  limpar() {

  }

  excluir(id: number) {
    this.modal.confirmDelete().subscribe((clicked) => {
      if (clicked) {
        this.service.excluir(id).subscribe({
          next: (id: number) => {
            this.alert.alertInfo(MsgUtil.excluir_sucesso);
            this.lista.update((list) => list.filter((agenda: any) => agenda.id !== id))
          },
          error: (error) => {
            this.alert.alertDanger(error.error.message || 'Ocorreu um erro inesperado ao excluir.');
          },
        });
      }
    })
  }

  navigateTo(rota: string, id: any) {
    this.irParaRota.navigate([rota, id]);
  }

}
