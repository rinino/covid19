import { Component, OnInit } from '@angular/core';

import { RecuperoJsonService } from '../../services/recupero-json.service';

import { AndamentoNazionaleDto } from '../../models/andamento-nazionale-dto';

@Component({
  selector: 'app-andamento',
  templateUrl: './andamento.component.html',
  styleUrls: ['./andamento.component.css']
})
export class AndamentoComponent implements OnInit {

  growlMessage: string;
  andamentoNazionale: AndamentoNazionaleDto[];

  constructor(
    private recuperoJsonService: RecuperoJsonService
  ) { }

  ngOnInit(): void {
    this.initAndamentoNazionale();

  }

  initAndamentoNazionale(): void {
      this.recuperoJsonService.getAndamentoNazionale().subscribe((response) => {
      this.andamentoNazionale = response;
    });
  }

}
