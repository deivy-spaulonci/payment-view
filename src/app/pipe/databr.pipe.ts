import { Pipe, PipeTransform } from '@angular/core';
import {Util} from "../util/util";

@Pipe({
  name: 'databr'
})
export class DatabrPipe implements PipeTransform {
  util: Util = new Util();
  transform(value: any, ...args: unknown[]): unknown {
    if (value) {
      return this.util.dateToDataBR(value.toString());
    }
    return null;
  }

}
