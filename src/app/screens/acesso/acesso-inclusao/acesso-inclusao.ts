import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractComponent } from '../../abstract-component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AcessoService } from '../../../service/acesso-service';
import { FuncionarioService } from '../../../service/funcionario-service';
import { NgxMaskDirective } from "ngx-mask";
import { EnumFuncao } from '../../../model/enum/enum-funcao';
import { EnumRoles } from '../../../model/enum/enum-roles';
import { EnumSituacaoUser } from '../../../model/enum/enum-situacao-user';
import { MsgUtil } from '../../../shared/utilitario/msg.-util';
import { CpfPipe } from '../../../shared/pipes/cpf-pipe';
import { Validator } from '../../../shared/validator/validator';

@Component({
  selector: 'app-acesso-inclusao',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, CpfPipe],
  templateUrl: './acesso-inclusao.html',
  styleUrl: './acesso-inclusao.scss',
})
export class AcessoInclusao extends AbstractComponent implements OnInit {
  formFuncionario!: FormGroup;

  service = inject(AcessoService);
  serviceFuncionario = inject(FuncionarioService);
  route = inject(ActivatedRoute);
  listaUsuarios = signal<any[]>([]);

  enumRoles = EnumRoles.values();
  enumSituacao = EnumSituacaoUser.values();

  constructor() {
    super();
    this.listar();

    this.formFuncionario = this.formBuilder.group({
      id: [null],
      nome: [{ value: '', disabled: true }],
      cpf: [{ value: '', disabled: true }],
      emailCorporativo: [null],
      funcao: [{ value: '', disabled: true }],
      departamento: [{ value: '', disabled: true }],
      matricula: [{ value: '', disabled: true }],
      dataAdmissao: [{ value: '', disabled: true }],
    });

    this.formulario = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      username: [null, [Validators.required]],
      situacao: [null, [Validators.required]],
      role: [null, [Validators.required]],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]],
    }, { validators: Validator.password });

    var id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.formFuncionario.get('id')?.setValue(id);
      this.buscarFuncionario();
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
    const id = this.formFuncionario.get('id')?.value;
    if (id == null || id == 'null') {
      this.alert.alertWarning("Selecione um Funcionário para vincular a um usuário.")
      this.formulario.reset();
      return;
    }

    this.serviceFuncionario.findUsuarioByFuncionarioId(id).subscribe({
      next: (obj: any) => {
        console.log(JSON.stringify(obj))
        obj.funcao = EnumFuncao.descricao(obj.funcao);

        this.formFuncionario.patchValue({
          id: [obj?.id],
          nome: [obj?.nome],
          cpf: [obj?.cpf],
          emailCorporativo: [obj?.emailCorporativo],
          funcao: [obj.funcao],
          departamento: [obj.departamento],
          matricula: [obj.matricula],
          dataAdmissao: [obj?.dataAdmissao],
        });

        if (obj?.usuario) {
          this.formulario.patchValue({
            id: obj.usuario.id ?? null,
            username: obj.usuario.username ?? null,
            emailCorporativo: obj.usuario.emailCorporativo ?? null,
            password: null,
            passwordConfirm: null,
            role: obj.usuario.role ?? null,
            situacao: obj.usuario.situacao ?? null,
          })
        }
      },
      error: (error: any) => {
        this.alert.alertDanger(error.error.message);
      }
    });
  }

  salvar() {
    if (this.formulario.invalid) {
      this.alert.alertWarning(MsgUtil.validar_campos_obrigatorios)
      this.formulario.markAllAsTouched();
      return;
    }

    if (this.formFuncionario.get('id')?.value) {
      if (this.formulario.get('id')?.value) {
        console.log("Update")
        this.service.atualizarUsuario(this.formFuncionario.get('id')?.value, this.formulario.value).subscribe({
          next: (obj: any) => {
            this.alert.alertInfo("Funcionário e Usuário foram vinculados com sucesso.");
            this.formulario.reset();
            this.formFuncionario.reset();
          },
          error: (error: any) => {
            this.alert.alertDanger(error.error.message)
          }
        });
      } else {
        console.log("Salvar")
        this.service.salvarUsuario(this.formFuncionario.get('id')?.value, this.formulario?.value).subscribe({
          next: (obj: any) => {
            this.alert.alertInfo("O Funcionário e O Usuário foram vinculados com sucesso.");
            this.formulario.reset();
            this.formFuncionario.reset();
          },
          error: (error: any) => {
            this.alert.alertDanger(error.error.message)
          }
        });

      }
    } else {
      this.alert.alertWarning("É preciso ter o ID do Funcionário para poder fazer alterações.")
    }
  }

  cancelar() {

  }

}


