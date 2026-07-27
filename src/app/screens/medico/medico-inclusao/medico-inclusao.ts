import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MedicoService } from '../../../service/medico-service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-medico-inclusao',
  imports: [RouterLink, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './medico-inclusao.html',
  styleUrl: './medico-inclusao.scss',
})
export class MedicoInclusao implements OnInit {
  formulario!: FormGroup;
  service = inject(MedicoService);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: [null, [Validators.required, Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.maxLength(100)]],
      cpf: [null, [Validators.required]],
      celular: [null, [Validators.required]],
      telefone: [null],
    });
  }

  salvar() {
    if (this.formulario.invalid) {
      return;
    }
    this.service.salvar(this.formulario.value).subscribe((response: any) => {
      this.formulario.reset();
    });
  }

  cancelar() {
    this.formulario.reset();
  }
}
