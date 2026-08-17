import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MedicoService } from '../../../service/medico-service';
import { NgxMaskDirective } from 'ngx-mask';
import { AbstractComponent } from '../../abstract-component';
import { CommonModule } from '@angular/common';
import { NgbAlert, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Validator } from '../../../shared/validator/validator';
import { EnumGenero } from '../../../model/enum/enum-genero';

@Component({
  selector: 'app-medico-inclusao',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NgxMaskDirective, NgbNavModule,],
  templateUrl: './medico-inclusao.html',
  styleUrl: './medico-inclusao.scss',
})
export class MedicoInclusao extends AbstractComponent implements OnInit {
  activeTab = 1;
  service = inject(MedicoService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  enumGeneros = EnumGenero.values();

  constructor() {
    super();
    console.log(this.enumGeneros)
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
      email: [null, [Validators.required, Validators.maxLength(100), Validators.email,]],
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
      especialidade: [null],
      subEspecialidade: [null],
      crm: [null],
      crmEstado: [null],

      instituicaoGraduacao: [null],
      statusPos: [null],
      instituicaoPos: [null],
      statusMestrado: [null],
      instituicaoMestrado: [null],
      statusDoutorado: [null],
      instituicaoDoutorado: [null],
    });

    var id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isCRUD = "R";
      this.service.buscarPorId(id).subscribe((medico: any) => {
        this.formulario.patchValue(medico);
        this.formulario.disable();
      });
    }
  }

  salvar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    if (this.formulario.value.id) {
      this.service.editar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/medico-listagem']);
        this.alert.alertInfo("Alterado com sucesso!!");
      });
    } else {
      this.service.salvar(this.formulario.value).subscribe(() => {
        this.alert.alertInfo("Salvo com sucesso!!");
        this.router.navigate(['/medico-listagem']);
      });
    }
  }

  limpar() {
    this.formulario.reset();
  }

  cancelar() {
    this.service.buscarPorId(this.formulario.value.id).subscribe((medico: any) => {
      this.formulario.patchValue(medico);
      this.formulario.disable();
      this.isCRUD = "R";
    });
  }

  habilitarCampos() {
    this.isCRUD = "U";
    this.formulario.enable();
  }

}
