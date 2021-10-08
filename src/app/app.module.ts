import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { DatePipe } from '@angular/common';
import { TredigitsPipe } from './pipes/tredigits-pipe';

import { GoogleChartsModule } from 'angular-google-charts';


// material
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

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
import { RegioniComponent } from './components/regioni/regioni.component';
import { MappaComponent } from './components/mappa/mappa.component';

import * as jQuery from "jquery";
import { AdminComponent } from './components/admin/admin.component';
import {MatIconModule} from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { AccordionDecessi19Component } from './components/accordion-decessi19/accordion-decessi19.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    BasilicataComponent,
    InfoComponent,
    ReportIssComponent,
    RegioniComponent,
    TredigitsPipe,
    MappaComponent,
    AdminComponent,
    AccordionDecessi19Component,
    

  ],
  imports: [
    BrowserModule,
    AccordionModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    NgbModule,
    GoogleChartsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,  useValue: { appearance: 'fill' } },
    RecuperoJsonService, DatePipe, MatIconModule, FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
