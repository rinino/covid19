import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { DatePipe } from '@angular/common';

// Components
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AndamentoComponent } from './components/andamento/andamento.component';
import { HomeComponent } from './components/home/home.component';
import { BasilicataComponent } from './components/basilicata/basilicata.component';

// Services
import {RecuperoJsonService} from './services/recupero-json.service';
import { AppRoutingModule } from './modules/app-routing.module';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AndamentoComponent,
    HomeComponent,
    BasilicataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [RecuperoJsonService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
