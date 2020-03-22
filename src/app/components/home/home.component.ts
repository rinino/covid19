import { Component, OnInit } from '@angular/core';

import { RecuperoJsonService } from '../../services/recupero-json.service';

import { AndamentoNazionaleDto } from '../../models/andamento-nazionale-dto';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataAggiornamento: string;

  constructor(
  ) {}

  ngOnInit(): void {
    this.dataAggiornamento = new Date().toLocaleString();
  }

}
