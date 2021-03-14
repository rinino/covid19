import { Component, HostListener, OnInit } from '@angular/core';

import { RecuperoJsonService } from '../../services/recupero-json.service';

import { DatiRapportoIssDto } from '../../models/dati-rapporto-iss-dto';
import { UtilsService } from 'src/app/services/utils.service';
import { AppConfig } from 'src/app/app.config';

@Component({
  selector: 'app-report-iss',
  templateUrl: './report-iss.component.html',
  styleUrls: ['./report-iss.component.css']
})
export class ReportIssComponent implements OnInit {

  constructor(
    private recuperoJsonService: RecuperoJsonService,
    private utilsService: UtilsService
  ) { }

  public dataAggiornamento: string;
  public dataPubblicazione: string;
  public pathFile: string;
  public idRapporto: string;
  public pathFileAnalisiDecessi: string;

  public rapporti: DatiRapportoIssDto[] = [];

  ngOnInit(): void {
    this.initReport();
    this.setPathAnalisiDecessi();
   
  }

  getUrlToPdf(): string {
    return this.pathFile;
  }

  setPathAnalisiDecessi(): void {
    this.pathFileAnalisiDecessi = 'https://www.epicentro.iss.it/coronavirus/bollettino/Report-COVID-2019_1_marzo_2021.pdf';
  }

  initReport(): void {
    this.recuperoJsonService.getRapportAttivo().subscribe(
      data => {
        this.dataAggiornamento = this.utilsService.transformDate(data.dtAggiornamento, AppConfig.DATA_ITA_NO_ORE_FORMAT);
        this.dataPubblicazione = this.utilsService.transformDate(data.dtPubblicazione, AppConfig.DATA_ITA_NO_ORE_FORMAT);
        this.pathFile = data.pathFile;
        this.idRapporto = data.idRapporto;
        this.getDatiReport(data.idRapporto);
      }

    );
  }

  getDatiReport(idRapporto: string | number): void {
    var rapportoIssDTO: DatiRapportoIssDto;
    var idRapportoInt: number = +idRapporto;
    this.recuperoJsonService.getDatiRapporto(idRapportoInt).subscribe(
      data => {

        data.forEach((rapporto: {
          letalita: string; classeEta: any;
          numCasi: string; numDeceduti: string;
          percCasi: string,
          percDeceduti: string;
          fasciaCalcolo: string
        }) => {
          rapportoIssDTO = new DatiRapportoIssDto();
          rapportoIssDTO.letalita = rapporto.letalita;
          rapportoIssDTO.num_casi = rapporto.numCasi;
          rapportoIssDTO.num_deceduti = rapporto.numDeceduti;
          rapportoIssDTO.perc_casi = rapporto.percCasi;
          rapportoIssDTO.perc_deceduti = rapporto.percDeceduti;
          rapportoIssDTO.classeEta = rapporto.classeEta.valore;
          rapportoIssDTO.fascia_calcolo = rapporto.fasciaCalcolo;
          this.rapporti.push(rapportoIssDTO);
        });
        this.rapporti.sort((a, b) => a.classeEta < b.classeEta ? -1 : a.classeEta > b.classeEta ? 1 : 0);
      }
    );
  }

}
