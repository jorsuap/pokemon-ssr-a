import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { map, Observable, tap } from 'rxjs';
import { PokeAPIResponse } from '../interfaces/pokemon-api.response';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private http = inject(HttpClient);

  private baseUrl = 'https://pokeapi.co/api/v2/';

  public loadPage(page: number = 0): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page);
    return this.http.get<PokeAPIResponse>(`${this.baseUrl}/pokemon?limit=20&offset=${page * 20}`).pipe(
      map((response) => response.results.map((result) => ({
        name: result.name,
        id: result.url.split('/').at(-2) ?? '',
      })))
    );
  }

  public getPokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${id}`);
  }

}
