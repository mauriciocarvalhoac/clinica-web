import { Component, inject, OnInit } from '@angular/core';
import { AbstractComponent } from '../../../abstract-component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartamentoService } from '../../../../service/departamento-service';
import { EnumSituacao } from '../../../../model/enum/enum-situacao';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tab-departamento-inclusao',
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './departamento-inclusao.html',
  styleUrl: './departamento-inclusao.scss',
})
export class DepartamentoInclusao extends AbstractComponent implements OnInit {
  formularioDepartamento!: FormGroup;
  serviceDepartamento = inject(DepartamentoService);

  enumSituacao = EnumSituacao.values();

  constructor() {
    super();

  }

  ngOnInit(): void {
    this.formularioDepartamento = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.required, Validators.maxLength(100)]],
      situacao: [null, [Validators.required]],
    });
  }

  salvarDepartamento() {
    if (this.formularioDepartamento.invalid) {
      this.alert.alertWarning('Preencha os campos obrigatórios');
      this.formularioDepartamento.markAllAsTouched();
      return;
    }

    this.serviceDepartamento.salvar(this.formularioDepartamento.value)
      .subscribe({
        next: (response) => {
          this.alert.alertInfo('Departamento salvo com sucesso!');
          this.serviceDepartamento.notificarAtualizacao();
          this.formularioDepartamento.reset();
        },
        error: (error) => {
          console.error('Erro ao salvar departamento:', error);
          this.alert.alertDanger(error?.error?.message || 'Erro ao salvar departamento. Tente novamente mais tarde.');
        }
      });
  }
}
