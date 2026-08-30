import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractComponent } from '../../abstract-component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AcessoService } from '../../../service/acesso-service';
import { FuncionarioService } from '../../../service/funcionario-service';
import { NgxMaskDirective } from "ngx-mask";
import { EnumFuncao } from '../../../model/enum/enum-funcao';
import { EnumRoles } from '../../../model/enum/enum-roles';
import { EnumSituacaoUser } from '../../../model/enum/enum-situacao-user';

@Component({
  selector: 'app-acesso-inclusao',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, NgxMaskDirective],
  templateUrl: './acesso-inclusao.html',
  styleUrl: './acesso-inclusao.scss',
})
export class AcessoInclusao extends AbstractComponent implements OnInit {

  service = inject(AcessoService);
  serviceFuncionario = inject(FuncionarioService);
  route = inject(ActivatedRoute);
  listaUsuarios = signal<any[]>([]);
  enumRoles = EnumRoles.values();
  enumSituacao = EnumSituacaoUser.values();

  constructor() {
    super();
    this.listar();
    this.formulario = this.formBuilder.group({
      id: [null],
      username: [null, [Validators.required]],
      emailCorporativo: [null, [Validators.email]],
      situacao: [null, [Validators.required]],
      role: [null, [Validators.required]],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]],
      funcionario: this.formBuilder.group({
        id: [null, [Validators.required]],
        nome: [{ value: '', disabled: true }],
        cpf: [{ value: '', disabled: true }],
        funcao: [{ value: '', disabled: true }],
        departamento: [{ value: '', disabled: true }],
        matricula: [{ value: '', disabled: true }],
      }),
    });

    var id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.service.buscarPorId(id).subscribe((obj) => {
        this.formulario.patchValue(obj);
      });
    }
  }

  ngOnInit(): void {

  }

  listar() {
    this.serviceFuncionario.listar().subscribe((lista: any) => {
      this.listaUsuarios.set(lista);
    });
  }

  buscarFuncionario() {
    const id = this.formulario.get('funcionario')?.get('id')?.value;
    if (id == 'null') {
      this.alert.alertWarning("Selecione um Funcionário para vincular a um usuário.")
      this.formulario.reset();
      return;
    }

    this.serviceFuncionario.findUsuarioByFuncionarioId(this.formulario.get('funcionario')?.get("id")?.value).subscribe({
      next: (obj: any) => {
        obj.funcao = EnumFuncao.descricao(obj.funcao)
        this.formulario.get('funcionario')?.patchValue(obj);
        this.formulario.patchValue(obj.usuario)
      },
      error: (error: any) => {
        this.alert.alertDanger(error.error.message);
      }
    });

  }

  salvar() {
    console.log("Funcionario: " + this.formulario.get('funcionario')?.get('id')?.value)
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const idFuncionario = this.formulario.get('funcionario')?.get('id')?.value;
    console.log("idFuncionario: " + idFuncionario)
    const idUsuario = this.formulario.get('id')?.value;
    console.log("idUsuario: " + idUsuario)

    if (idFuncionario && idUsuario) {
      console.log("Update")
      this.service.atualizarUsuario(this.formulario?.get('id')?.value, this.formulario?.value).subscribe({
        next: (obj: any) => {
          this.alert.alertInfo("Funcionário e Usuário foram vinculados com sucesso.");
          this.formulario.reset();
        },
        error: (error: any) => {
          this.alert.alertDanger(error.error.message)
        }
      });
    } else {
      console.log("Salvar")
      this.service.salvarUsuario(this.formulario.get('funcionario')?.get('id')?.value, this.formulario?.value).subscribe({
        next: (obj: any) => {
          this.alert.alertInfo("O Funcionário e O Usuário foram vinculados com sucesso.");
          this.formulario.reset();
        },
        error: (error: any) => {
          this.alert.alertDanger(error.error.message)
        }
      });
    }
  }

  cancelar() {

  }

}


