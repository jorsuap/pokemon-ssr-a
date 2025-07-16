import { TestBed } from '@angular/core/testing';
import { PokemonsService } from './pokemons.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { PokeAPIResponse } from '../interfaces/pokemon-api.response';
import { catchError } from 'rxjs';

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'Bulbasaur' },
  { id: '2', name: 'Ivysaur' },
];

const mockPokeAPIResponse: PokeAPIResponse = {
  count: 1118,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'Bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'Ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ]
};

const mockPokemon = {
  id: 1,
  name: 'Bulbasaur',
} as any;

describe('Service: Pokemons', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();//Verifica que no haya peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of simple pokemons', () => {
    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    console.log(req);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokeAPIResponse);//es el mock de la respuesta, valores que se esperan en el observable
  });

  it('should load page 5 of simple pokemons', () => {
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=20&offset=80');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokeAPIResponse);
  });

  it('should load a pokemon by id', () => {
    const pokemonId = '1';
    service.getPokemon(pokemonId).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
      expect(pokemon.name).toBe('Bulbasaur');
      expect(pokemon.id).toBe(mockPokemon.id);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should load a pokemon by name', () => {
    const pokemonName = 'Bulbasaur';
    service.getPokemon(pokemonName).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
      expect(pokemon.name).toBe('Bulbasaur');
      expect(pokemon.id).toBe(mockPokemon.id);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should catch an error when pokemon not found', () => {
    const pokemonName = 'unknown';
    service.getPokemon(pokemonName)
    .pipe(
      catchError((error) => {
        expect(error.message).toBe('Pokemon not found');//manejo de errores
        return [];
      })
    )
    .subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    expect(req.request.method).toBe('GET');
    req.flush('Pokemon not found', {
      status: 404,
      statusText: 'Not Found'
    });
  });
});