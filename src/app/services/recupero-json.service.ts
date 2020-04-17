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
  private baseUrlRegioni: string;
  private baseUrlProvince: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrlAndamentoNazionale = AppConfig.GITLAB_ENDPOINT + AppConfig.ANDAMENTO_NAZIONALE;
    this.baseUrlAndamentoNazionleLatest = AppConfig.GITLAB_ENDPOINT + AppConfig.ANDAMENTO_NAZIONALE_LATEST;
    this.baseUrlRegioni = AppConfig.GITLAB_ENDPOINT + AppConfig.DATI_REGIONI;
    this.baseUrlProvince = AppConfig.GITLAB_ENDPOINT + AppConfig.DATI_PROVINCE;

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

  getDatiRegioni(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrlRegioni);
  }

  getDatiProvince(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrlProvince);
  }

}
