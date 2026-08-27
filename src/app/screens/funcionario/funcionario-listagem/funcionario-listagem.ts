import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CpfPipe } from '../../../shared/pipes/cpf-pipe';
import { NgxMaskDirective } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractComponent } from '../../abstract-component';
import { FuncionarioService } from '../../../service/funcionario-service';
import { FuncaoPipe } from '../../../shared/pipes/funcao-pipe';

@Component({
  selector: 'app-funcionario-listagem',
  imports: [ReactiveFormsModule, NgxMaskDirective, CpfPipe, FuncaoPipe, RouterLink],
  templateUrl: './funcionario-listagem.html',
  styleUrl: './funcionario-listagem.scss',
})
export class FuncionarioListagem extends AbstractComponent implements OnInit {

  private service = inject(FuncionarioService);
  router = inject(Router);

  lista = signal<any>([]);
  listaSize = signal<number>(0);

  constructor() {
    super();
    this.formulario = this.formBuilder.group({
      nome: null,
      cpf: null,
    });
  }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe((lista: any) => {
      this.lista.set(lista);
      this.listaSize.set(lista.length);
    });
  }

  filtrar() {
    this.service.filtrar(this.formulario.value.nome, this.formulario.value.cpf).subscribe((filtros: any[]) => {
      this.lista.set(filtros);
      this.listaSize.set(filtros.length);
    });
  }

  excluir(obj: any) {
    this.modal.confirmDelete().subscribe((result) => {
      if (result) {
        this.service.excluir(obj.id).subscribe(() => {
          this.listar();
        });
      }
    });
  }

  irParaEdicao(obj: any) {
    this.router.navigate(['/funcionario-inclusao', obj.id]);
  }

  limpar() {
    this.formulario.reset();
    this.listar();
  }
}

