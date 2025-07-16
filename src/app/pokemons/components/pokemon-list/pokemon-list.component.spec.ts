
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PokemonListComponent } from './pokemon-list.component';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';
import { provideRouter } from '@angular/router';

const mockPokemons: SimplePokemon[] = [
  { id: '1', name: 'Bulbasaur' },
  { id: '2', name: 'Ivysaur' },
];

describe('PokemonListComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ PokemonListComponent ],
      providers: [
        provideRouter([]),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    fixture.componentRef.setInput('pokemons',[]);//Seteamos el input signal del componente
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the pokemon list with two pokemons cards', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);//Seteamos el input signal del componente
    fixture.detectChanges();
    const cards = compiled.querySelectorAll('pokemon-card');
    expect(cards.length).toBe(mockPokemons.length);
  });

  it('should render "No hay pokemons" when the pokemons signal is empty', () => {
    fixture.componentRef.setInput('pokemons',[]);//Seteamos el input signal del componente
    fixture.detectChanges();
    const noPokemons = compiled.querySelector('div');
    expect(noPokemons?.textContent).toContain('No hay pokemons');
  });
});
