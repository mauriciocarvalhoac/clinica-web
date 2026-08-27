import { Pipe, PipeTransform } from '@angular/core';
import { EnumFuncao } from '../../model/enum/enum-funcao';

@Pipe({
  name: 'funcao',
})
export class FuncaoPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value) {
      return EnumFuncao.descricao(value.toString())
    }
    return null;
  }
}
