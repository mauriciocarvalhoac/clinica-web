import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractComponent } from '../../abstract-component';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AcessoService } from '../../../service/acesso-service';
import { FuncaoPipe } from '../../../shared/pipes/funcao-pipe';
import { RolePipe } from '../../../shared/pipes/role-pipe';

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

  visualizacao(obj: any) {
    throw new Error('Method not implemented.');
  }

  filtrar() {
    this.service.filtrar(this.formulario.get('username')?.value).subscribe({
      next: (value) => {
        this.lista.set(value);
      },
    });
  }

  irPara(rota: any, id: any) {
    this.irParaRota.navigate([rota, id]);
  }

}
