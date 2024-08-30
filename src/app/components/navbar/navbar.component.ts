import { Component } from '@angular/core';
import { InicioComponent } from '../inicio/inicio.component';
import { TablasComponent } from '../tablas/tablas.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [InicioComponent, TablasComponent, RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export default class NavbarComponent {}
