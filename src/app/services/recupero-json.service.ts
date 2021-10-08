import { AppConfig } from '../app.config';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  private jsonUtenteByUserAndPass: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrlAndamentoNazionale = AppConfig.GITLAB_ENDPOINT + AppConfig.ANDAMENTO_NAZIONALE;
    this.baseUrlAndamentoNazionleLatest = AppConfig.GITLAB_ENDPOINT + AppConfig.ANDAMENTO_NAZIONALE_LATEST;
    this.baseUrlRegioni = AppConfig.GITLAB_ENDPOINT + AppConfig.DATI_REGIONI;
    this.baseUrlProvince = AppConfig.GITLAB_ENDPOINT + AppConfig.DATI_PROVINCE;
    this.baseUrlAndamentoDeceduti = AppConfig.ANDAMENTO_DECEDUTI_COMPLETO;
    this.baseUrlAndamentoDimessi = AppConfig.ANDAMENTO_DIMESI_COMPLETO;
    this.baseUrlRegioniLatest = AppConfig.DATI_REGIONI_LATEST;
    this.jsonReportUrl = 'assets/json/dati_rapporto.json';
    this.jsonRapportoAttivo = 'assets/json/report_attivo.json';

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

  getRapportAttivo(): Observable<any> {
    return this.httpClient.get<any>(this.jsonRapportoAttivo);

  }

  getDatiRapporto(_idRapporto: string | number): Observable<any> {
    return this.httpClient.get<any>(this.jsonReportUrl);

  }


  // utente

  public getDatiUtente(username: string, password: string): Observable<any> {

    // let postData = new FormData();
    // postData.append('username', username);
    // postData.append('password', password);

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET, POST, OTIONS'

    //   })
    // };

    // return this.httpClient.post<any>(this.jsonUtenteByUserAndPass,
    //   postData
    // );

    return;

  }

}
