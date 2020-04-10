import { AppConfig } from '../app.config';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// Models
import { AndamentoNazionaleDto } from '../models/andamento-nazionale-dto';

@Injectable()
export class RecuperoJsonService {
  private baseUrlAndamentoNazionale: string;
  private baseUrlAndamentoNazionleLatest: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrlAndamentoNazionale = AppConfig.GITLAB_ENDPOINT + AppConfig.ANDAMENTO_NAZIONALE;
    this.baseUrlAndamentoNazionleLatest = AppConfig.GITLAB_ENDPOINT + AppConfig.ANDAMENTO_NAZIONALE_LATEST;

  }

  getAndamentoNazionale(): Observable<AndamentoNazionaleDto[]> {
   return this.httpClient.get<AndamentoNazionaleDto[]>(this.baseUrlAndamentoNazionale);
  }

  getDatiAndamentoNazionaleLatest(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrlAndamentoNazionleLatest);
  }

  getDataAggiornamento(): string {
    const andamentoNazionaleLatest = this.getDatiAndamentoNazionaleLatest();
    console.log(andamentoNazionaleLatest);
    return 'ciao';
  }

  /**
   * function getDatiAndamentoNazionaleLatest() {
  var jsonResultAndamentoNazionaleLatest;
  $.ajax({
    dataType: "json",
    url: urlAndamentoNazionaleLatest
    ,
    async: false,
    data: jsonResultAndamentoNazionaleLatest
    ,
    success: function (data) {
      jsonResultAndamentoNazionaleLatest
        = data;
    },
    error: function (e) {
      console.log("errore: " + e);
    }
  });
  return jsonResultAndamentoNazionaleLatest;

}
   */

}
