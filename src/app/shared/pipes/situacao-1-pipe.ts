import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'situacao1',
})
export class Situacao1Pipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value) {
      return "Ativo";
    }
    return "Inativo";
  }
}
