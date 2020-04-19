import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AppConfig } from '../../app.config';
// Service
import { RecuperoJsonService } from '../../services/recupero-json.service';
import { UtilsService } from '../../services/utils.service';


@Component({
  selector: 'app-basilicata',
  templateUrl: './basilicata.component.html',
  styleUrls: ['./basilicata.component.css']
})
export class BasilicataComponent implements OnInit {


  constructor(
    private recuperoJsonService: RecuperoJsonService,
    private utilsService: UtilsService
  ) { }

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


  barChartData: ChartDataSets[] = [
    { data: this.terapiaIntensiva, label: 'Terapia intensiva' },
    { data: this.totaleCasi, label: 'Totale casi' },
    { data: this.tamponi, label: 'Tamponi' },
    { data: this.deceduti, label: 'Deceduti' },
    { data: this.dimessi, label: 'Dimessi / Guariti' },

  ];
  barChartLabels: Label[] = this.labeldata;

  barChartOptions = {
    responsive: true,
  };

  barChartColors: Color[] = [
    {
      borderColor: [
        '#FF0000',
        '#3e95cd'
      ]
    },
  ];

  barChartLegend = true;
  barChartPlugins = [];
  barChartType = 'bar';

  // dati province pz mt

  private totaleCasiPz = [];
  private totaleCasiMt = [];

  lineChartData: ChartDataSets[] = [
    { data: this.totaleCasiPz, label: 'Totale casi PZ' },
    { data: this.totaleCasiMt, label: 'Totale casi MT' },

  ];
  lineChartLabels: Label[] = this.labeldata;

  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: [
        '#FF0000',
        '#3e95cd'
      ],
      // backgroundColor: [
      //   '#FF0000'
      // ],
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';


  ngOnInit(): void {
    this.initDatiRegioni();
    this.initDatiProvince();
  }

  initDatiRegioni(): void {
    this.recuperoJsonService.getDatiRegioni().subscribe(
      data => {
        data.forEach((regione: {
          codice_regione: number; data: any;
          terapia_intensiva: any; totale_casi: any; tamponi: any,
          deceduti: any; dimessi_guariti: any;
        }) => {
          if (regione.codice_regione === 17) {
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


  initDatiProvince(): void {
    this.recuperoJsonService.getDatiProvince().subscribe(
      data => {
        data.forEach((provincia: {
          sigla_provincia: string;
          totale_casi: string;
        }) => {
          if (provincia.sigla_provincia === 'PZ') {
            this.totaleCasiPz.push(provincia.totale_casi);
          }
          if (provincia.sigla_provincia === 'MT') {
            this.totaleCasiMt.push(provincia.totale_casi);
          }
        });
      },
      error => {
        console.log('errore');
      }
    );
  }
}
