import { Routes } from '@angular/router';
import NavbarComponent from './components/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { TablasComponent } from './components/tablas/tablas.component';

export const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: 'tablas',
        component: TablasComponent
      }
    ]
  },
  { path: '**', redirectTo: 'inicio' }
];
