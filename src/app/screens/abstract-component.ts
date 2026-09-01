import { Component, inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from '../shared/modal/modal-component/modal-service';
import { AlertService } from '../shared/alert/alert-service';
import { Router } from '@angular/router';

export enum CrudEnum {
  C = "C", R = "R", U = "U", D = "D"
}
@Injectable({
  providedIn: 'root'
})
export abstract class AbstractComponent {
  protected formulario!: FormGroup;
  protected formBuilder = inject(FormBuilder);
  protected modal = inject(ModalService);
  protected alert = inject(AlertService);
  protected irParaRota = inject(Router);

  isCRUD = "C";

  constructor() {

  }

  hasNotValidated(valor: string) {
    return this.formulario.get(valor)?.invalid &&
      (this.formulario.get(valor)?.touched || this.formulario.get(valor)?.dirty)
  };

  // navigateTo(rota: string, obj?: any) {
  //   if (obj)
  //     this.irParaRota.navigate([rota, obj.id]);
  //   else
  //     this.irParaRota.navigate([rota]);
  // }
}
