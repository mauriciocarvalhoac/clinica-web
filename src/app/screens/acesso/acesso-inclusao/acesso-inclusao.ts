import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractComponent } from '../../abstract-component';
import { RouterLink } from '@angular/router';
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
  listaUsuarios = signal<any[]>([]);
  enumRoles = EnumRoles.values();
  enumSituacao = EnumSituacaoUser.values();

  constructor() {
    super();
    this.listar();
    this.formulario = this.formBuilder.group({

      funcionarioSelecionadoID: [],

      nome: [{ value: '', disabled: true }],
      cpf: [{ value: '', disabled: true }],
      funcao: [{ value: '', disabled: true }],
      departamento: [{ value: '', disabled: true }],
      matricula: [{ value: '', disabled: true }],

      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]],
      emailCorporativo: [null, [Validators.email]],
      role: [null, [Validators.required]],
      situacao: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {

  }

  listar() {
    this.serviceFuncionario.listar().subscribe((lista: any) => {
      this.listaUsuarios.set(lista);
    });
  }

  buscarFuncionario() {

    if (this.formulario.get('funcionarioSelecionadoID')?.value == null || this.formulario.get('funcionarioSelecionadoID')?.value === "null" || !this.formulario.get('funcionarioSelecionadoID')?.value) {
      this.alert.alertWarning("Selecione um Funcionário para vincular a um usuário.")
      return;
    }

    this.serviceFuncionario.buscarPorId(this.formulario.get('funcionarioSelecionadoID')?.value).subscribe((obj: any) => {
      obj.funcao = EnumFuncao.descricao(obj.funcao)
      this.formulario.patchValue(obj);
    });
  }

  salvar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.service.salvar(this.formulario.value).subscribe((obj: any) => {
      this.alert.alertInfo("Funcionário e Usuário foram vinculados com sucesso.");
    });
  }

  cancelar() {

  }

}


