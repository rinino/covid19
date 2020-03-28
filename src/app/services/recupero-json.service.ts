import { AppConfig } from '../app.config';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// Models
import { AndamentoNazionaleDto } from '../models/andamento-nazionale-dto';

@Injectable()
export class RecuperoJsonService {
  private baseUrlAndamentoNazionale: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrlAndamentoNazionale = AppConfig.GITLAB_ENDPOINT + AppConfig.ANDAMENTO_NAZIONALE;
  }

  getAndamentoNazionale(): Observable<AndamentoNazionaleDto[]> {
   return this.httpClient.get<AndamentoNazionaleDto[]>(this.baseUrlAndamentoNazionale);
  }

}
