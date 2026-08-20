import { Component, inject, OnInit } from '@angular/core';
import { AbstractComponent } from '../../abstract-component';
import { PacienteService } from '../../../service/paciente-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EnumGenero } from '../../../model/enum/enum-genero';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Validator } from '../../../shared/validator/validator';
import { NgxMaskDirective } from 'ngx-mask';
import { EnumEstados } from '../../../model/enum/enum-estado';

@Component({
  selector: 'app-paciente-inclusao',
  imports: [ReactiveFormsModule, RouterLink, CommonModule, NgxMaskDirective],
  templateUrl: './paciente-inclusao.html',
  styleUrl: './paciente-inclusao.scss',
})
export class PacienteInclusao extends AbstractComponent implements OnInit {
  service = inject(PacienteService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  enumGeneros = EnumGenero.values();
  enumEstados = EnumEstados.values();

  constructor() {
    super();
    this.isCRUD = "C";
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.maxLength(250)]],
      cpf: [null, [Validators.required]],
      rg: [null],
      dataNascimento: [null, [Validators.required, Validator.dateOfBirth]],
      genero: [null],
      email: [null, [Validators.required]],
      celular: [null, [Validators.required]],
      telefone: [null],
      endereco: this.formBuilder.group({
        cep: [null],
        logradouro: [null],
        numero: [null],
        bairro: [null],
        cidade: [null],
        estado: [null],
      }),
    });

    var id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isCRUD = "R";
      this.service.buscarPorId(id).subscribe((obj: any) => {
        this.formulario.patchValue(obj);
        this.formulario.disable();
      });
    }
  }

  salvar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.alert.alertWarning("Preencha todos oscampos obrigatórios!!");
      return;
    }

    if (!this.formulario.value.id) {
      this.service.salvar(this.formulario.value).subscribe({
        next: () => {
          this.router.navigate(['/paciente-listagem']);
          this.alert.alertInfo("Cadastrado com sucesso!!");
        }
      });
    } else {
      this.service.editar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/paciente-listagem']);
        this.alert.alertInfo("Alterado com sucesso!!");
      });
    }
  }

  cancelar() {
    if (this.formulario.value.id) {
      this.service.buscarPorId(this.formulario.value.id).subscribe((obj: any) => {
        this.formulario.patchValue(obj);
        this.formulario.disable();
        this.isCRUD = "R";
      });
    }
  }

  limpar() {
    this.formulario.reset();
  }

  habilitarCampos() {
    this.isCRUD = "U";
    this.formulario.enable();
  }
}
