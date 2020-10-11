import { Component, OnInit } from '@angular/core';

import { RecuperoJsonService } from '../../services/recupero-json.service';

import { DatiRapportoIssDto } from '../../models/dati_rapporto_iss_dto';
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

  public rapporti: DatiRapportoIssDto[] = [];

  ngOnInit(): void {
    this.getDatiReport();
  }

  getUrlToPdf(): string {
    return this.pathFile;
  }

  getDatiReport(): void {
    var rapportoIssDTO: DatiRapportoIssDto;
    this.recuperoJsonService.getDatiJsonReport().subscribe(
      data => {
        this.dataAggiornamento = this.utilsService.transformDate(data[2].data[0].dt_aggiornamento, AppConfig.DATA_ITA_NO_ORE_FORMAT);
        this.dataPubblicazione = this.utilsService.transformDate(data[2].data[0].dt_pubblicazione, AppConfig.DATA_ITA_NO_ORE_FORMAT);
        this.pathFile = data[2].data[0].path_file;

        data[2].data.forEach((rapporto: {
          letalita: string; classeEta: string;
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
          rapportoIssDTO.classeEta = rapporto.classeEta;
          rapportoIssDTO.fascia_calcolo = rapporto.fascia_calcolo;
          this.rapporti.push(rapportoIssDTO);
        });
        this.rapporti.sort((a, b) => a.classeEta < b.classeEta ? -1 : a.classeEta > b.classeEta ? 1 : 0);
      }
    );
  }

}
