import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'meInfo'
})
export class MeInfoPipe implements PipeTransform {
  transform(value: object, args?: string): string {
    if (value) {
      return value[args];
    }
  }
}

