import { Injectable } from '@angular/core';



@Injectable()
export class AppConfig {

    public static get APP_NAME(): string { return 'Codiv-19'; }
    public static get GITLAB_ENDPOINT(): string { return 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/' }
    public static get ANDAMENTO_NAZIONALE(): string {return 'dati-json/dpc-covid19-ita-andamento-nazionale.json';}

}
