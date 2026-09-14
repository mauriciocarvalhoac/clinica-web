import { Component, inject, OnInit } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AbstractComponent } from '../abstract-component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnumSituacao } from '../../model/enum/enum-situacao';
import { DepartamentoService } from '../../service/departamento-service';

@Component({
  selector: 'app-cadastros-auxiliares',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbNavModule],
  templateUrl: './cadastros-auxiliares.html',
  styleUrl: './cadastros-auxiliares.scss',
})
export class CadastrosAuxiliares extends AbstractComponent implements OnInit {
  formularioDepartamento!: FormGroup;
  serviceDepartamento = inject(DepartamentoService);

  activeTab = 1;
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
          this.formularioDepartamento.reset();
        },
        error: (error) => {
          console.error('Erro ao salvar departamento:', error);
          this.alert.alertDanger(error?.error?.message || 'Erro ao salvar departamento. Tente novamente mais tarde.');
        }
      });
  }
}
