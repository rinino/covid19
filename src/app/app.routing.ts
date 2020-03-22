
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Component
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AndamentoComponent } from './components/andamento/andamento.component';


const appRoutes: Routes = [
    {
        path: 'andamento',
        component: AndamentoComponent
    }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
