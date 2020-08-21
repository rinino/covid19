import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { DatePipe } from '@angular/common';

// Components
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { BasilicataComponent } from './components/basilicata/basilicata.component';

// Services
import {RecuperoJsonService} from './services/recupero-json.service';
import { AppRoutingModule } from './modules/app-routing.module';

import { ChartsModule } from 'ng2-charts';
import { InfoComponent } from './components/info/info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportIssComponent } from './components/report-iss/report-iss.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    BasilicataComponent,
    InfoComponent,
    ReportIssComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [RecuperoJsonService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
