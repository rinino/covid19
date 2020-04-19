import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AppConfig } from '../../app.config';
// service
import { RecuperoJsonService } from '../../services/recupero-json.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(
    private recuperoJsonService: RecuperoJsonService,
    private utilService: UtilsService
  ) { }

  // dati Latest
  public dataAggiornamentoLatest: string;
  public ricoveratiConSintomiLatest: string;
  public terapiaIntensivaLatest: string;
  public totaleOspedalizzatiLatest: string;
  public isolamentoDomiciliareLatest: string;
  public totalePositiviLatest: string;
  public variazioneTotaliPositiviLatest: string;
  public nuoviPositiviLatest: string;
  public dimessiGuaritiLatest: string;
  public decedutiLatest: string;
  public totaleCasiLatest: string;
  public tamponiLatest: string;

  // dati andamento nazionale
  private labeldataNazionale = [];
  // primo grafico
  private tamponiNazionale = [];
  private totaleAttualmentePositiviNazionale = [];
  // secondo grafico
  private terapiaIntensivaNazionale = [];
  private decedutiNazionale = [];
  // terzo grafico
  private variazioneTotalePositiviNazionale = [];
  private nuoviPositiviNazionale = [];

  // dati decessi/dimessi
  private labelData = [];
  private numeroDecessi = [];
  private numeroDimessi = [];

  // 1) grafico tamponi/attualmente positivi - INIZIO
  lineChartDataTamponiPositivi: ChartDataSets[] = [
    { data: this.tamponiNazionale, label: 'Tamponi' },
    { data: this.totaleAttualmentePositiviNazionale, label: 'Attualmente positivi' },

  ];
  lineChartLabelsDataTamponiPositivi: Label[] = this.labeldataNazionale;

  lineChartOptionsDataTamponiPositivi = {
    responsive: true,
    maintainAspectRatio: true,
  };

  lineChartColorsDataTamponiPositivi: Color[] = [
    {
      borderColor: [
        '#8e5ea2',
        '#1e17cf'
      ],
      backgroundColor: [
        '#1e17cf'
      ],
    },
  ];
  lineChartLegendDataTamponiPositivi = true;
  lineChartPluginsDataTamponiPositivi = [];
  lineChartTypeDataTamponiPositivi = 'line';
  // 1) grafico tamponi/attualmente positivi - FINE

  // 2) grafico terapia/deceduti - INIZIO
  lineChartDataTerapiaDeceduti: ChartDataSets[] = [
    { data: this.terapiaIntensivaNazionale, label: 'Terapia intesiva' },
    { data: this.decedutiNazionale, label: 'Deceduti' },

  ];
  lineChartLabelsTerapiaDeceduti: Label[] = this.labeldataNazionale;

  lineChartOptionsTerapiaDeceduti = {
    responsive: true,
    maintainAspectRatio: true,
  };

  lineChartColorsTerapiaDeceduti: Color[] = [
    {
      borderColor: [
        '#FF0000',
        '#3e95cd'
      ],
      backgroundColor: [
        '#3e95cd'
      ],
    },
  ];
  lineChartLegendTerapiaDeceduti = true;
  lineChartPluginsTerapiaDeceduti = [];
  lineChartTypeTerapiaDeceduti = 'line';
  // 2) grafico tamponi/attualmente positivi - FINE

  // 3) grafico tot positivi/nuovi positivi - INIZIO
  lineChartDataTotPositiviNuovi: ChartDataSets[] = [
    { data: this.variazioneTotalePositiviNazionale, label: 'Variazione positivi' },
    { data: this.nuoviPositiviNazionale, label: 'Nuovi positivi' },

  ];
  lineChartLabelsTotPositiviNuovi: Label[] = this.labeldataNazionale;

  lineChartOptionsTotPositiviNuovi = {
    responsive: true,
  };

  lineChartColorsTotPositiviNuovi: Color[] = [
    {
      borderColor: [
        '#3e95cd',
        '#00ff00'
      ],
      backgroundColor: [
        '#00ff00'
      ],
    },
  ];
  lineChartLegendTotPositiviNuovi = true;
  lineChartPluginsTotPositiviNuovi = [];
  lineChartTypeTotPositiviNuovi = 'line';
  // 3) grafico tamponi/attualmente positivi - FINE

  // 4) grafico trend deceduti/dimessi - INIZIO
  lineChartDataTrendDecessi: ChartDataSets[] = [
    { data: this.numeroDecessi, label: 'Deceduti' },
    { data: this.numeroDimessi, label: 'Dimessi' },
  ];
  lineChartLabelsTrendDecessi: Label[] = this.labelData;

  lineChartOptionsTrendDecessi = {
    responsive: true,
  };

  lineChartColorsTrendDecessi: Color[] = [
    {
      borderColor: [
        '#ff0000',
        '#00ff00'
      ],
      backgroundColor: [
        '#00ff00'
      ],
    },
  ];
  lineChartLegendTrendDecessi = true;
  lineChartPluginsTrendDecessi = [];
  lineChartTypeTrendDecessi = 'line';
  // 4) grafico trend deceduti/dimessi - FINE

  ngOnInit(): void {
    this.initDatiAndamentoNazionaleLatest();
    this.initDatiAndamentoNazionale();
    this.initDatiDeceduti();
    this.initDatiDimessi();

  }

  initDatiAndamentoNazionale(): void {
    this.recuperoJsonService.getAndamentoNazionale().subscribe(
      data => {
        data.forEach((andamento: {
          data: any;
          terapia_intensiva: any;
          totale_casi: any;
          tamponi: any,
          deceduti: any;
          dimessi_guariti: any;
          variazione_totale_positivi: any;
          nuovi_positivi: any;
        }) => {
          this.labeldataNazionale.push(this.utilService.transformDate(andamento.data, AppConfig.DATA_ITA_GG_MM_FORMAT));
          this.tamponiNazionale.push(andamento.tamponi);
          this.totaleAttualmentePositiviNazionale.push(andamento.totale_casi);
          this.terapiaIntensivaNazionale.push(andamento.terapia_intensiva);
          this.decedutiNazionale.push(andamento.deceduti);
          this.variazioneTotalePositiviNazionale.push(andamento.variazione_totale_positivi);
          this.nuoviPositiviNazionale.push(andamento.nuovi_positivi);
        });
      },
      error => {
        console.log('errore');
      }
    );
  }

  initDatiDeceduti(): void {
    this.recuperoJsonService.getDatiDecedutiTrend().subscribe(
      data => {
        for (const i of data.giorno) {
          const dataFormattata = this.utilService.transformDate(i, AppConfig.DATA_ITA_GG_MM_FORMAT);
          this.labelData.push(dataFormattata);
        }
        for (const i of data.decessi) {
          this.numeroDecessi.push(i);
        }
      },
      error => {
        console.log('errore');
      }
    );
  }

  initDatiDimessi(): void {
    this.recuperoJsonService.getDatiDimessiTrend().subscribe(
      data => {
        for (const i of data.dimessi) {
          this.numeroDimessi.push(i);
        }
      },
      error => {
        console.log('errore');
      }
    );
  }

  initDatiAndamentoNazionaleLatest(): void {
    this.recuperoJsonService.getDatiAndamentoNazionaleLatest().subscribe(
      data => {
        this.dataAggiornamentoLatest = this.utilService.transformDate(data[0].data, AppConfig.DATA_ITA_GG_MM_FORMAT);
        this.ricoveratiConSintomiLatest = this.utilService.formatNumber(data[0].ricoverati_con_sintomi);
        this.terapiaIntensivaLatest = this.utilService.formatNumber(data[0].terapia_intensiva);
        this.totaleOspedalizzatiLatest = this.utilService.formatNumber(data[0].totale_ospedalizzati);
        this.isolamentoDomiciliareLatest = this.utilService.formatNumber(data[0].isolamento_domiciliare);
        this.totalePositiviLatest = this.utilService.formatNumber(data[0].totale_positivi);
        this.variazioneTotaliPositiviLatest = this.utilService.formatNumber(data[0].variazione_totale_positivi);
        this.nuoviPositiviLatest = this.utilService.formatNumber(data[0].nuovi_positivi);
        this.dimessiGuaritiLatest = this.utilService.formatNumber(data[0].dimessi_guariti);
        this.decedutiLatest = this.utilService.formatNumber(data[0].deceduti);
        this.totaleCasiLatest = this.utilService.formatNumber(data[0].totale_casi);
        this.tamponiLatest = this.utilService.formatNumber(data[0].tamponi);
      },
      error => {
        console.log('errore');
      }
    );
  }
}
