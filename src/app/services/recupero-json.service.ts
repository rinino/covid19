import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';


// Models
import { AndamentoNazionaleDto } from '../models/andamento-nazionale-dto';

@Injectable({
  providedIn: 'root'
})
export class RecuperoJsonService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = AppConfig.GITLAB_ENDPOINT + AppConfig.ANDAMENTO_NAZIONALE;
  }

  getAndamentoNazionale(): Observable<AndamentoNazionaleDto[]> {
    return this.http.get<AndamentoNazionaleDto[]>(this.baseUrl);
  }


}
