import { Component, signal } from '@angular/core';


export class AbstractComponent {
  isCRUD = "C";
}
export enum CrudEnum {
  C, R, U, D
}