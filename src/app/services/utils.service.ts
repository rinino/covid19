import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private datePipe: DatePipe) { }

  calcolaPercentuale(totale: string, daValutare: string): string {
    const totaleNumber: number = + totale;
    const daValutareNumber: number = + daValutare;
    const finalValue: number = daValutareNumber * 100 / totaleNumber;
    return '' + finalValue.toFixed(2).replace('.', ',');

  }

  transformDate(date: any, format: string) {
    return this.datePipe.transform(date, format);
  }


}
