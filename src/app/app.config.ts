import { Injectable } from '@angular/core';



@Injectable()
export class AppConfig {

  public static get APP_NAME(): string { return 'Codiv-19'; }
  public static get GITLAB_START_PATH(): string { return 'https://raw.githubusercontent.com/'; }
  public static get GITLAB_ENDPOINT(): string { return this.GITLAB_START_PATH + 'pcm-dpc/COVID-19/master/dati-json/'; }
  public static get ANDAMENTO_NAZIONALE(): string { return 'dpc-covid19-ita-andamento-nazionale.json'; }
  public static get ANDAMENTO_NAZIONALE_LATEST(): string { return 'dpc-covid19-ita-andamento-nazionale-latest.json'; }
  public static get DATI_REGIONI(): string { return 'dpc-covid19-ita-regioni.json'; }
  public static get DATI_REGIONI_LATEST(): string {return 'dpc-covid19-ita-regioni-latest.json'}
  public static get DATI_PROVINCE(): string { return 'dpc-covid19-ita-province.json'; }
  public static get API_RAPPORTI_START_PATH(): string  {return 'http://localhost/api/';}
  //public static get API_RAPPORTI_START_PATH(): string  {return 'https://api.andamentocovid19.it/api/';}

  public static get ANDAMENTO_DECEDUTI_COMPLETO(): string {
    return this.GITLAB_START_PATH + 'VitoFanelli/covid-19-italy/master/notebookIT/decessiITA.json';
  }
  public static get ANDAMENTO_DIMESI_COMPLETO(): string {
    return this.GITLAB_START_PATH + 'VitoFanelli/covid-19-italy/master/notebookIT/dimessiITA.json';
  }

  public static get DATA_ITA_GG_MM_FORMAT(): string {return 'dd/MM'; }
  public static get DATA_ITA_NO_ORE_FORMAT(): string {return 'dd/MM/yyyy'; }
  public static get DATA_ITA_HH_MM_FORMAT(): string {return 'dd/MM/yyyy hh:MM'; }
}
