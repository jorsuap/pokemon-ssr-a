/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'Bulbasaur',
};

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ PokemonCardComponent ],
      providers: [
        provideRouter([]),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);//Seteamos el input del componente
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the simple pokemon signal inputValue', () => {
    expect(component.pokemon()).toBe(mockPokemon);
  });

  it('should reder the pokemon name and image correctly', ()=> {
    const img = compiled.querySelector('img')!;
    const name = compiled.querySelector('h2')!;

    expect(img).toBeDefined();
    expect(name).toBeDefined();
    expect(name.textContent).toBe(mockPokemon.name);
    expect(img.src).toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`);
  });

  it('should have the proper ng-reflct-router-link', () => {
    const reflect = compiled.querySelector('div');
    expect(reflect?.getAttribute('ng-reflect-router-link')).toBe(`/pokemon,${mockPokemon.name}`);
  });
});
