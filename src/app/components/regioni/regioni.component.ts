import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../app.config';

// Service
import { RecuperoJsonService } from '../../services/recupero-json.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-regioni',
  templateUrl: './regioni.component.html',
  styleUrls: ['./regioni.component.css']
})
export class RegioniComponent implements OnInit {

  constructor(
    private recuperoJsonService: RecuperoJsonService,
    private utilsService: UtilsService
  ) { }


  public selectRegioni = [];
  public selectedOption = 17;
  public regioneSelezionata = "Basilicata";

  // dati regionali
  private labeldata = [];
  private terapiaIntensiva = [];
  private totaleCasi = [];
  private tamponi = [];
  private deceduti = [];
  private dimessi = [];

  public ultimoDatoDeceduti: string;
  public ultimoDatoTotaleCasi: string;
  public ultimoDatoTamponi: string;
  public ultimoDatoDimessi: string;
  public ultimoDatoTerapia: string;
  public dataAggiornamento: string;

  public percentualeDecedutiCasiTotali: string;
  public percentualeGuaritiCasiTotali: string;
  public percentualePositiviTamponi: string;


  ngOnInit(): void {
    this.initSelectRegioni();
    this.getNomeRegioneFromCodice();
    this.datiRegionali(this.selectedOption);
  }


  initSelectRegioni(): void {
    this.selectRegioni = [
      { value: 13, viewValue: 'Abruzzo' },
      { value: 17, viewValue: 'Basilicata' },
      { value: 18, viewValue: 'Calabria' },
      { value: 15, viewValue: 'Campania' },
      { value: 8, viewValue: 'Emilia-Romagna' },
      { value: 6, viewValue: 'Friuli Venezia Giulia' },
      { value: 12, viewValue: 'Lazio' },
      { value: 7, viewValue: 'Liguria' },
      { value: 3, viewValue: 'Lombardia' },
      { value: 11, viewValue: 'Marche' },
      { value: 14, viewValue: 'Molise' },
      { value: 21, viewValue: 'P.A. Bolzano' },
      { value: 22, viewValue: 'P.A. Trento' },
      { value: 1, viewValue: 'Piemonte' },
      { value: 16, viewValue: 'Puglia' },
      { value: 20, viewValue: 'Sardegna' },
      { value: 19, viewValue: 'Sicilia' },
      { value: 9, viewValue: 'Toscana' },
      { value: 10, viewValue: 'Umbria' },
      { value: 2, viewValue: 'Valle d\' Aosta' },
      { value: 5, viewValue: 'Veneto' }
    ];
  }

  onChange(regione: { value: number; }) {
    this.selectedOption = regione.value;
    this.getNomeRegioneFromCodice();
    this.datiRegionali(this.selectedOption);

  }


  datiRegionali(idRegione: number): void {
    this.recuperoJsonService.getDatiRegioni().subscribe(
      data => {
        data.forEach((regione: {
          codice_regione: number; data: any;
          terapia_intensiva: any; totale_casi: any; tamponi: any,
          deceduti: any; dimessi_guariti: any;
        }) => {
          if (regione.codice_regione === idRegione) {
            this.labeldata.push(this.utilsService.transformDate(regione.data, AppConfig.DATA_ITA_GG_MM_FORMAT));
            this.terapiaIntensiva.push(regione.terapia_intensiva);
            this.totaleCasi.push(regione.totale_casi);
            this.tamponi.push(regione.tamponi);
            this.deceduti.push(regione.deceduti);
            this.dimessi.push(regione.dimessi_guariti);
          }
        });

        this.dataAggiornamento = this.labeldata[this.labeldata.length - 1];
        this.ultimoDatoDeceduti = this.deceduti[this.deceduti.length - 1];
        this.ultimoDatoTotaleCasi = this.totaleCasi[this.totaleCasi.length - 1];
        this.ultimoDatoTamponi = this.tamponi[this.tamponi.length - 1];
        this.ultimoDatoDimessi = this.dimessi[this.dimessi.length - 1];
        this.ultimoDatoTerapia = this.terapiaIntensiva[this.terapiaIntensiva.length - 1];

        this.percentualeDecedutiCasiTotali = this.utilsService.calcolaPercentuale(this.ultimoDatoTotaleCasi, this.ultimoDatoDeceduti);
        this.percentualeGuaritiCasiTotali = this.utilsService.calcolaPercentuale(this.ultimoDatoTotaleCasi, this.ultimoDatoDimessi);
        this.percentualePositiviTamponi = this.utilsService.calcolaPercentuale(this.ultimoDatoTamponi, this.ultimoDatoTotaleCasi);

      },
      error => {
        console.log('errore');
      }
    );
  }


  getNomeRegioneFromCodice(): void {
    for (var regione of this.selectRegioni) {
      if (regione.value == this.selectedOption) {
        this.regioneSelezionata = regione.viewValue;
        break;
      }
    }
  }

}
