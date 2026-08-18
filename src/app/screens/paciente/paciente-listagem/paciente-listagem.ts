import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractComponent } from '../../abstract-component';
import { PacienteService } from '../../../service/paciente-service';
import { Router, RouterLink } from '@angular/router';
import { CpfPipe } from '../../../shared/pipes/cpf-pipe';
import { NgxMaskDirective } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-paciente-listagem',
  imports: [ReactiveFormsModule, NgxMaskDirective, CpfPipe, RouterLink],
  templateUrl: './paciente-listagem.html',
  styleUrl: './paciente-listagem.scss',
})
export class PacienteListagem extends AbstractComponent implements OnInit {

  private service = inject(PacienteService);

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

  limpar() {
    this.formulario.reset();
    this.listar();
  }

  filtrar() {
    this.service.filtrar(this.formulario.value.nome, this.formulario.value.cpf).subscribe((pacientes: any[]) => {
      this.lista.set(pacientes);
      this.listaSize.set(pacientes.length);
    });
  }

  irParaEdicao(item: any) {
    this.irParaRota.navigate(['/paciente-inclusao', item.id]);
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

}
