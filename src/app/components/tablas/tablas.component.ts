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
  newPokemonDescription: string = '';
  newPokemonType: any;
  pokemons: any[] = [];
  completedPokemons: Set<string> = new Set<string>();
  errorMessage: string = '';
  selectedPokemon: any = null;
  editingPokemon: any = null;
  Pokemonfilter: string = '';
  filteredPokemons: any[] = [];

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
          return of({ results: [] });
        })
      )
      .subscribe((data) => {
        this.pokemons = data.results.map((pokemon: any) => ({
          ...pokemon,
          url: pokemon.url,
          type: this.getPokemonType(pokemon.url) || 'unknown',
        }));
        this.filteredPokemons = this.pokemons;
      });
  }

  addPokemon(): void {
    if (this.newPokemonName.trim() && this.newPokemonDescription.trim()) {
      const type = this.newPokemonType || 'unknown';

      this.pokemons.push({
        name: this.newPokemonName,
        url: `https://pokeapi.co/api/v2/pokemon/${this.newPokemonName.toLowerCase()}`,
        description: this.newPokemonDescription,
        type: type,
      });

      this.newPokemonName = '';
      this.newPokemonDescription = '';
      this.newPokemonType = '';
      this.filterPokemons();
    }
  }

  deletePokemon(url: string): void {
    this.pokemons = this.pokemons.filter((pokemon) => pokemon.url !== url);
    this.filterPokemons();
  }

  markCompleted(url: string): void {
    if (this.completedPokemons.has(url)) {
      this.completedPokemons.delete(url);
    } else {
      this.completedPokemons.add(url);
    }
  }

  investigar(url: string): void {
    const selectedPokemon = this.pokemons.find(
      (pokemon) => pokemon.url === url
    );
    if (selectedPokemon) {
      this.selectedPokemon = selectedPokemon;
    }
  }

  editPokemon(pokemon: any): void {
    this.editingPokemon = { ...pokemon };
  }

  updatePokemon(): void {
    if (this.editingPokemon) {
      const index = this.pokemons.findIndex(
        (pokemon) => pokemon.url === this.editingPokemon.url
      );
      if (index !== -1) {
        this.pokemons[index] = this.editingPokemon;
        this.filterPokemons();
      }
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingPokemon = null;
  }

  closeDialog(): void {
    this.selectedPokemon = null;
  }

  filterPokemons(): void {
    if (this.Pokemonfilter === '') {
      this.filteredPokemons = this.pokemons;
    } else if (this.Pokemonfilter === 'unknown') {
      this.filteredPokemons = this.pokemons.filter(
        (pokemon) => !pokemon.type || pokemon.type === 'unknown'
      );
    } else {
      this.filteredPokemons = this.pokemons.filter(
        (pokemon) => pokemon.type === this.Pokemonfilter
      );
    }
  }

  getPokemonType(url: string): string {
    return 'unknown';
  }
}
