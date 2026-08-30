import { Pipe, PipeTransform } from '@angular/core';
import { EnumFuncao } from '../../model/enum/enum-funcao';
import { EnumRoles } from '../../model/enum/enum-roles';

@Pipe({
  name: 'role',
})
export class RolePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value) {
      return EnumRoles.descricao(value.toString())
    }
    return null;
  }
}
