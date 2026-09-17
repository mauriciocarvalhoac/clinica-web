import { Component, inject, OnInit } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AbstractComponent } from '../abstract-component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnumSituacao } from '../../model/enum/enum-situacao';
import { DepartamentoService } from '../../service/departamento-service';
import { DepartamentoInclusao } from './departamento/departamento-inclusao/departamento-inclusao';
import { DepartamentoListagem } from './departamento/departamento-listagem/departamento-listagem';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastros-auxiliares',
  standalone: true,
  imports: [NgbNavModule, RouterLink],
  templateUrl: './cadastros-auxiliares.html',
  styleUrl: './cadastros-auxiliares.scss',
})
export class CadastrosAuxiliares {

  isActivated() {

  }

}
