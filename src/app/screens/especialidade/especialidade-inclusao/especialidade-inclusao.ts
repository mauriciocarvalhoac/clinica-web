import { Component, inject, OnInit } from '@angular/core';
import { AbstractComponent } from '../../abstract-component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from "ngx-mask";
import { EspecialidadeService } from '../../../service/especialidade-service';
import { EnumSituacao } from '../../../model/enum/enum-situacao';

@Component({
  selector: 'app-especialidade-inclusao',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, NgxMaskDirective],
  templateUrl: './especialidade-inclusao.html',
  styleUrl: './especialidade-inclusao.scss',
})
export class EspecialidadeInclusao extends AbstractComponent implements OnInit {
  service = inject(EspecialidadeService);
  route = inject(ActivatedRoute);
  enumSituacao = EnumSituacao.values();

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.required, Validators.maxLength(200)]],
      cbo: [null, [Validators.maxLength(6)]],
      tiss: [null, [Validators.maxLength(10)]],
      situacao: [null]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.buscarPorId(id).subscribe((obj: any) => {
        this.formulario.patchValue(obj);
        this.isCRUD = "U";
      });
    }
  }
  salvar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.alert.alertWarning('Preencha todos os campos obrigatórios!');
      return;
    }

    if (this.formulario.value.id) {
      console.log('Atualizando especialidade:', this.formulario.value);
      this.service.editar(this.formulario.value).subscribe({
        next: (response) => {
          this.alert.alertInfo('Especialidade editada com sucesso!');
          this.irParaRota.navigate(['/especialidade-listagem']);
        },
        error: (error) => {
          this.alert.alertDanger(error.error.message);
        }
      });
    } else {
      console.log('Cadastrando especialidade:', this.formulario.value);
      this.service.salvar(this.formulario.value).subscribe({
        next: (response) => {
          this.alert.alertInfo('Especialidade cadastrada com sucesso!');
          this.irParaRota.navigate(['/especialidade-listagem']);
        },
        error: (error) => {
          this.alert.alertDanger(error.error.message);
        }
      });
    }
  }

  cancelar() {
    this.service.buscarPorId(this.formulario.value.id).subscribe((obj: any) => {
      this.formulario.patchValue(obj);
      this.formulario.disable();
      this.isCRUD = "R";
    });
  }

  limpar() {
    this.formulario.reset();
  }

} 
