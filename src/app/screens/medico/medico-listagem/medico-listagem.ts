import { Component, inject, OnInit, signal } from '@angular/core';
import { MedicoService } from '../../../service/medico-service';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { CpfPipe } from '../../../shared/pipes/cpf-pipe';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-medico-listagem',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, CpfPipe, RouterLink],
  templateUrl: './medico-listagem.html',
  styleUrl: './medico-listagem.scss',
})
export class MedicoListagem implements OnInit {
  private service = inject(MedicoService);
  formulario!: FormGroup;

  lista = signal<any>([]);
  listaSize = signal<number>(0);

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
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
    console.log("Filtrando com os valores: ", this.formulario.value);

    this.service.filtrar(this.formulario.value.nome, this.formulario.value.cpf).subscribe((medicos: any[]) => {
      this.lista.set(medicos);
      this.listaSize.set(medicos.length);
    });
  }

  limpar() {
    this.formulario.reset();
    this.listar();
  }
}
