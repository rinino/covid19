import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Tredigits'
})
export class TredigitsPipe implements PipeTransform {

  transform(value: number | string, locale?: string): string {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Number(value));
  }
}