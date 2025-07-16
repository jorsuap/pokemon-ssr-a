import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
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
    return this.http.get<PokeAPIResponse>(`${this.baseUrl}pokemon?limit=20&offset=${page * 20}`).pipe(
      map((response) => response.results.map((result) => ({
        name: result.name,
        id: result.url.split('/').at(-2) ?? '',
      })))
    );
  }

  public getPokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}pokemon/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An error occurred:', error.error);
    } else {
      console.log(`Backend returned code ${error.status}, body: ${error.error}`);
    }

    const errorMessage = error.error ?? 'An error occurred';

    return throwError(() => new Error(errorMessage));
  }

}
