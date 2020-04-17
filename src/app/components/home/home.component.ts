import { Component, OnInit } from '@angular/core';

import { RecuperoJsonService } from '../../services/recupero-json.service';

import { AndamentoNazionaleDto } from '../../models/andamento-nazionale-dto';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataAggiornamento: string;
  json: string;
  primo: AndamentoNazionaleDto;
  andamento: AndamentoNazionaleDto[] = [];

  constructor(
    private recuperoJsonService: RecuperoJsonService,
  ) { }

  ngOnInit(): void {
    // this.dataAggiornamento = new Date().toLocaleString();
    // this.initAndamentoNazionale();
    console.log('home');

  }

  // initAndamentoNazionale(): void {
  //   this.recuperoJsonService.getAndamentoNazionale().subscribe(
  //     data => {
  //       this.andamento = data;
  //       console.log('a: ' + JSON.stringify(this.andamento));
  //     },
  //     error => {
  //       console.log('errore');
  //     }
  //   );
  // }

}
