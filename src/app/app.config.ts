import { Injectable } from '@angular/core';



@Injectable()
export class AppConfig {

    public static get APP_NAME(): string { return 'Codiv-19'; }
    public static get GITLAB_ENDPOINT(): string { return 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/'; }
    public static get ANDAMENTO_NAZIONALE(): string {return 'dpc-covid19-ita-andamento-nazionale.json'; }
    public static get ANDAMENTO_NAZIONALE_LATEST(): string {return 'dpc-covid19-ita-andamento-nazionale-latest.json'; }
    public static get DATI_REGIONI(): string {return 'dpc-covid19-ita-regioni.json'; }
    public static get DATI_PROVINCE(): string {return 'dpc-covid19-ita-province.json'; }
}
