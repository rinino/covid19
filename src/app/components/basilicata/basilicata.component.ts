import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
// Service
import { RecuperoJsonService } from '../../services/recupero-json.service';
// DTO
import { DatiRegioniDto } from '../../models/dati-regioni-dto';


@Component({
  selector: 'app-basilicata',
  templateUrl: './basilicata.component.html',
  styleUrls: ['./basilicata.component.css']
})
export class BasilicataComponent implements OnInit, AfterViewInit {

  @ViewChild('basilicata') private canvas: any;


  datiRegione: DatiRegioniDto[] = [];
  barChart = [];

  private ctx: CanvasRenderingContext2D;

  // dati regionali
  private labeldata = [];
  private terapiaIntensiva = [];
  private totaleCasi = [];
  private tamponi = [];

  constructor(
    private recuperoJsonService: RecuperoJsonService
  ) { }

  ngOnInit(): void {
    this.ctx = this.canvas._element.nativeElement.getContext('2d');
    this.initDatiRegioni();
  }

  ngAfterViewInit(): void {
     this.renderChart(this.labeldata, this.terapiaIntensiva, this.totaleCasi, this.tamponi);
  }


  renderChart(labeldata: any, terapiaIntensiva: any, totaleCasi: any, tamponi: any) {
    this.barChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Terapia intensiva',
          data: terapiaIntensiva,
          borderColor: '#ff0000',
          backgroundColor: '#ff0000'
        }, {
          label: 'Num. tamponi',
          data: tamponi,
          borderColor: '#009933',
          backgroundColor: '#009933'
        }, {
          label: 'Casi totali',
          data: totaleCasi,
          borderColor: '#3333cc',
          backgroundColor: '#3333cc'
        }]
      },

      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  initDatiRegioni(): void {
    this.recuperoJsonService.getDatiRegioni().subscribe(
      data => {
        // this.datiRegione = data;
        // this.renderChart(data);
        data.forEach(regione => {
          if (regione.codice_regione === 17) {
            this.labeldata.push(regione.data);
            this.terapiaIntensiva.push(regione.terapia_intensiva);
            this.totaleCasi.push(regione.totale_casi);
            this.tamponi.push(regione.tamponi);
          }
        });
      },
      error => {
        console.log('errore');
      }
    );
  }

}
