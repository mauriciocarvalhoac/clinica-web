import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { AbstractComponent } from '../../abstract-component';
import { RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EspecialidadeService } from '../../../service/especialidade-service';

@Component({
  selector: 'app-especialidade-listagem',
  imports: [ReactiveFormsModule, RouterLink,],
  templateUrl: './especialidade-listagem.html',
  styleUrl: './especialidade-listagem.scss',
})
export class EspecialidadeListagem extends AbstractComponent implements OnInit {
  service = inject(EspecialidadeService);

  listaSize = signal(0);
  lista = signal<any>([]);

  constructor() {
    super();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      descricao: [null],
    });
    this.listar();
  }

  listar() {
    this.service.listar().subscribe((lista: any) => {
      this.lista.set(lista);
      this.listaSize.set(lista.length);
    });
  }

  filtrar() {
    this.service.filtrar(this.formulario.value.descricao).subscribe((lista: any) => {
      this.lista.set(lista);
      this.listaSize.set(lista.length);
    });
  }

  limpar() {
    throw new Error('Method not implemented.');
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