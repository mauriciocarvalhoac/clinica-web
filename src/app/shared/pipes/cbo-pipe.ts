import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cbo',
})
export class CboPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value) {
      return value.toString().replace(/(\d{4})(\d{2})/, '$1-$2');
    }
    return "";
  }
}
