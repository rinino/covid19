import { Component, HostListener, OnInit } from '@angular/core';

import { RecuperoJsonService } from '../../services/recupero-json.service';

import { DatiRapportoIssDto } from '../../models/dati-rapporto-iss-dto';
import { UtilsService } from 'src/app/services/utils.service';
import { AppConfig } from 'src/app/app.config';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

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

  @HostListener('window:scroll')

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
    this.pathFileAnalisiDecessi = 'https://www.epicentro.iss.it/coronavirus/bollettino/Report-COVID-2019_4_ottobre.pdf';
  }

  initReport(): void {
    this.recuperoJsonService.getRapportAttivo().subscribe(
      data => {
        this.dataAggiornamento = this.utilsService.transformDate(data.rapporti[0].dt_aggiornamento, AppConfig.DATA_ITA_NO_ORE_FORMAT);
        this.dataPubblicazione = this.utilsService.transformDate(data.rapporti[0].dt_pubblicazione, AppConfig.DATA_ITA_NO_ORE_FORMAT);
        this.pathFile = data.rapporti[0].path_file;
        this.idRapporto = data.rapporti[0].id_rapporto;
        this.getDatiReport(data.rapporti[0].id_rapporto);
      }

    );
  }

  getDatiReport(idRapporto: string | number): void {
    var rapportoIssDTO: DatiRapportoIssDto;
    var idRapportoInt: number = +idRapporto;
    this.recuperoJsonService.getDatiRapporto(idRapportoInt).subscribe(
      data => {
        // this.dataAggiornamento = this.utilsService.transformDate(data[2].data[0].dt_aggiornamento, AppConfig.DATA_ITA_NO_ORE_FORMAT);
        // this.dataPubblicazione = this.utilsService.transformDate(data[2].data[0].dt_pubblicazione, AppConfig.DATA_ITA_NO_ORE_FORMAT);
        // this.pathFile = data[2].data[0].path_file;

        data.dati_rapporti.forEach((rapporto: {
          letalita: string; classe_eta: string;
          num_casi: string; num_deceduti: string;
          perc_casi: string,
          perc_deceduti: string;
          fascia_calcolo: string
        }) => {
          rapportoIssDTO = new DatiRapportoIssDto();
          rapportoIssDTO.letalita = rapporto.letalita;
          rapportoIssDTO.num_casi = rapporto.num_casi;
          rapportoIssDTO.num_deceduti = rapporto.num_deceduti;
          rapportoIssDTO.perc_casi = rapporto.perc_casi;
          rapportoIssDTO.perc_deceduti = rapporto.perc_deceduti;
          rapportoIssDTO.classeEta = rapporto.classe_eta;
          rapportoIssDTO.fascia_calcolo = rapporto.fascia_calcolo;
          this.rapporti.push(rapportoIssDTO);
        });
        this.rapporti.sort((a, b) => a.classeEta < b.classeEta ? -1 : a.classeEta > b.classeEta ? 1 : 0);
      }
    );
  }

}
