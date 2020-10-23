import { AppConfig } from '../app.config';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RecuperoJsonService {
  private baseUrlAndamentoNazionale: string;
  private baseUrlAndamentoNazionleLatest: string;
  private baseUrlRegioni: string;
  private baseUrlProvince: string;
  private baseUrlAndamentoDeceduti: string;
  private baseUrlAndamentoDimessi: string;
  private baseUrlRegioniLatest: string;
  private jsonReportUrl: string;
  private jsonRapportoAttivo: string;
  private jsonDatiRapporto: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrlAndamentoNazionale = AppConfig.GITLAB_ENDPOINT + AppConfig.ANDAMENTO_NAZIONALE;
    this.baseUrlAndamentoNazionleLatest = AppConfig.GITLAB_ENDPOINT + AppConfig.ANDAMENTO_NAZIONALE_LATEST;
    this.baseUrlRegioni = AppConfig.GITLAB_ENDPOINT + AppConfig.DATI_REGIONI;
    this.baseUrlProvince = AppConfig.GITLAB_ENDPOINT + AppConfig.DATI_PROVINCE;
    this.baseUrlAndamentoDeceduti = AppConfig.ANDAMENTO_DECEDUTI_COMPLETO;
    this.baseUrlAndamentoDimessi = AppConfig.ANDAMENTO_DIMESI_COMPLETO;
    this.baseUrlRegioniLatest = AppConfig.DATI_REGIONI_LATEST;
    this.jsonReportUrl = 'assets/json/dati_rapporto.json';
    this.jsonRapportoAttivo = AppConfig.API_RAPPORTI_START_PATH + 'rapporto/getRapportoAttivo.php';
    this.jsonDatiRapporto = AppConfig.API_RAPPORTI_START_PATH + 'datiRapporto/getDatiRapporto.php';

  }

  getAndamentoNazionale(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrlAndamentoNazionale);
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

  getDatiDecedutiTrend(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrlAndamentoDeceduti);
  }

  getDatiDimessiTrend(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrlAndamentoDimessi);
  }


  getDatiRegioniLatest(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrlRegioniLatest);
  }


  getDatiJsonReport(): Observable<any> {
    return this.httpClient.get<any>(this.jsonReportUrl);
  }


  getAllRapporti(): Observable<any> {
    return this.httpClient.get<any>('https://api.andamentocovid19.it/api/rapporto/read.php');

  }

  getRapportAttivo(): Observable<any> {
    return this.httpClient.get<any>(this.jsonRapportoAttivo);

  }

  getDatiRapporto(_idRapporto: string | number): Observable<any> {
    return this.httpClient.get<any>(this.jsonDatiRapporto+"?idRapporto="+_idRapporto);

  }

}
