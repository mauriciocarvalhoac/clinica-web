import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { AbstractComponent } from '../../abstract-component';
import { RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EspecialidadeService } from '../../../service/especialidade-service';
import { SituacaoEspecialidadePipe } from '../../../shared/pipes/situacao-especialidade-pipe';
import { CboPipe } from '../../../shared/pipes/cbo-pipe';
import { EnumSituacao } from '../../../model/enum/enum-situacao';

@Component({
  selector: 'app-especialidade-listagem',
  imports: [ReactiveFormsModule, RouterLink, SituacaoEspecialidadePipe, CboPipe],
  templateUrl: './especialidade-listagem.html',
  styleUrl: './especialidade-listagem.scss',
})
export class EspecialidadeListagem extends AbstractComponent implements OnInit {
  service = inject(EspecialidadeService);

  listaSize = signal(0);
  lista = signal<any>([]);
  enumSituacao = EnumSituacao.values();

  constructor() {
    super();
    this.formulario = this.formBuilder.group({
      descricao: null,
      situacao: null,
    });
  }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe((lista: any) => {
      this.lista.set(lista);
      this.listaSize.set(lista.length);
    });
  }

  filtrar() {
    this.service.filtrar(this.formulario.value.descricao, this.formulario.value.situacao).subscribe((lista: any[]) => {
      this.lista.set(lista);
      this.listaSize.set(lista.length);
    });
  }

  limpar() {
    this.formulario.reset();
    this.listar();
  }

  excluir(obj: any) {
    this.modal.confirmDelete().subscribe((result) => {
      if (result) {
        this.service.excluir(obj.id).subscribe((response) => {
          this.alert.alertInfo('Especialidade excluída com sucesso!');
          this.listar();
        });
      }
    });
  }

  irParaEdicao(obj: any) {
    this.irParaRota.navigate(['/especialidade-inclusao', obj.id]);
  }
}