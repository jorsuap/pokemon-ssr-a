import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
})
export class PokemonCardComponent {
  public pokemon = input.required<SimplePokemon>({
    // alias: 'pokemone', // para que se pueda usar en el html como <pokemon-card pokemone="pokemon">
  });
  public imageUrl = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`);

  logEffect = effect(() => {
    // console.log('pokemon:', this.pokemon());
  });
}
