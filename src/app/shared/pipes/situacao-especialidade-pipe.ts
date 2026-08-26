import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'situacao',
})
export class SituacaoEspecialidadePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value) {
      return "Ativo";
    }
    return "Inativo";
  }
}
