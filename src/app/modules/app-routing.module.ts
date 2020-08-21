import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

// Component
import {HomeComponent} from '../components/home/home.component';
import {BasilicataComponent} from '../components/basilicata/basilicata.component';
import {PaginaNonTrovataComponent} from '../components/pagina-non-trovata/pagina-non-trovata.component';
import {InfoComponent} from '../components/info/info.component';
import {ReportIssComponent} from '../components/report-iss/report-iss.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Covid-19 - Dati nazionali' }
  },
  {
    path: 'reportIss',
    component: ReportIssComponent,
    data: { title: 'Covid-19 - Report ISS' }
  },
  {
    path: 'basilicata',
    component: BasilicataComponent,
    data: { title: 'Covid-19 - Basilicata' }
  },
  {
    path: 'info',
    component: InfoComponent,
    data: { title: 'Covid-19 - Info' }
  },
  { path: '**', component: PaginaNonTrovataComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
