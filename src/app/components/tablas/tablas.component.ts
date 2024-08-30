import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultasService } from '../../services/consultas.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-tablas',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ConsultasService],
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css'],
})
export class TablasComponent {
  newPokemonName: string = '';
  pokemons: any[] = [];
  completedPokemons: Set<string> = new Set<string>();
  errorMessage: string = '';

  constructor(private apiService: ConsultasService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.apiService
      .getItems('pokemon')
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Failed to load Pokémon data.';
          return of({ results: [] }); // Return an empty array on error
        })
      )
      .subscribe((data) => {
        this.pokemons = data.results.map((pokemon: any) => ({
          ...pokemon,
          url: pokemon.url, // Ensure URL is included
        }));
      });
  }

  addPokemon(): void {
    if (this.newPokemonName.trim()) {
      // Simulate adding a Pokémon by pushing it to the list
      this.pokemons.push({
        name: this.newPokemonName,
        url: `https://pokeapi.co/api/v2/pokemon/${this.newPokemonName.toLowerCase()}`,
      });
      this.newPokemonName = '';
    }
  }

  deletePokemon(url: string): void {
    this.pokemons = this.pokemons.filter((pokemon) => pokemon.url !== url);
  }

  markCompleted(url: string): void {
    if (this.completedPokemons.has(url)) {
      this.completedPokemons.delete(url);
    } else {
      this.completedPokemons.add(url);
    }
  }

  investigar(url: string): void {
    console.log(url);
  }
}
