import { Component, inject, OnInit, signal } from '@angular/core';
import { MedicoService } from '../../../service/medico-service';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { CpfPipe } from '../../../shared/pipes/cpf-pipe';
import { Router, RouterLink } from "@angular/router";
import { AbstractComponent } from '../../abstract-component';

@Component({
  selector: 'app-medico-listagem',
  // standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, CpfPipe, RouterLink],
  templateUrl: './medico-listagem.html',
  styleUrl: './medico-listagem.scss',
})
export class MedicoListagem extends AbstractComponent implements OnInit {

  private service = inject(MedicoService);
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
    this.service.filtrar(this.formulario.value.nome, this.formulario.value.cpf).subscribe((medicos: any[]) => {
      this.lista.set(medicos);
      this.listaSize.set(medicos.length);
    });
  }

  excluir(obj: any) {
    console.log("Abrir Modal")
    this.modal.confirmDelete().subscribe((result) => {
      console.log("Resultado na listagem: " + result)
      if (result) {
        this.service.excluir(obj.id).subscribe(() => {
          this.listar();
        });
      }
    });
  }

  irParaEdicao(obj: any) {
    this.router.navigate(['/medico-inclusao', obj.id]);
  }

  limpar() {
    this.formulario.reset();
    this.listar();
  }
}
