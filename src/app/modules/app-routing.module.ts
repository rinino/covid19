import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Required services for navigation
import { Routes, RouterModule } from '@angular/router';
// Component
import {HomeComponent} from '../components/home/home.component';
import {BasilicataComponent} from '../components/basilicata/basilicata.component';
import {PaginaNonTrovataComponent} from '../components/pagina-non-trovata/pagina-non-trovata.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Covid-19 - Dati nazionali' }
  },
  {
    path: 'basilicata',
    component: BasilicataComponent,
    data: { title: 'Covid-19 - Basilicata' }
  },
  { path: '**', component: PaginaNonTrovataComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }