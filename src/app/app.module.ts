import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AndamentoComponent } from './components/andamento/andamento.component';
import { HomeComponent } from './components/home/home.component';


// Services
import {RecuperoJsonService} from './services/recupero-json.service';

// Routes
import { routing } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AndamentoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing
  ],
  providers: [RecuperoJsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
