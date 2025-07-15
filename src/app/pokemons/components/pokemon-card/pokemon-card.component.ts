import { ChangeDetectionStrategy, Component, computed, effect, input, OnInit } from '@angular/core';
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
export class PokemonCardComponent implements OnInit {
  public pokemon = input.required<SimplePokemon>();
  public imageUrl = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`);

  logEffect = effect(() => {
    console.log('pokemon:', this.pokemon());
  });

  ngOnInit() {
  }

}
