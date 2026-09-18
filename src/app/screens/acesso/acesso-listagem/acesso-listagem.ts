import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractComponent } from '../../abstract-component';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AcessoService } from '../../../service/acesso-service';
import { FuncaoPipe } from '../../../shared/pipes/funcao-pipe';
import { RolePipe } from '../../../shared/pipes/role-pipe';
import { MsgUtil } from '../../../shared/utilitario/msg.-util';

@Component({
  selector: 'app-acesso-listagem',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FuncaoPipe, RolePipe,],
  templateUrl: './acesso-listagem.html',
  styleUrl: './acesso-listagem.scss',
})
export class AcessoListagem extends AbstractComponent implements OnInit {

  lista = signal<any[]>([]);

  service = inject(AcessoService);

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      username: [null],
    });

    this.listar();
  }

  constructor() {
    super();

  }

  listar() {
    this.service.listar().subscribe({
      next: (lista) => {
        this.lista.set(lista);
        console.log(lista)
      },
      error: (err) => {

      },
    });
  }

  excluir(id: any) {
    this.modal.confirmDelete().subscribe((isExcluir) => {
      if (isExcluir) {
        this.service.excluir(id).subscribe({
          next: (value) => {
            this.alert.alertInfo(MsgUtil.excluir_sucesso);
            this.listar();
          },
          error: (callback) => {
            this.alert.alertDanger(callback.error.message);
          },
        });
      }
    })






  }

  filtrar() {
    this.service.filtrar(this.formulario.get('username')?.value).subscribe({
      next: (value) => {
        this.lista.set(value);
      },
    });
  }

  limpar() {
    this.formulario.reset();
    this.listar();
  }

  irPara(rota: any, id: any) {
    this.irParaRota.navigate([rota, id]);
  }

}
