import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datebr'
})
export class DatebrPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): String {
    if(value){
      value=value.toString()
        .replace(/\D/g,"")
        .replace(/^(\d{4})(\d{2})(\d{2})/, "$3/$2/$1")
      return value;
    }
    return "";
  }

}
