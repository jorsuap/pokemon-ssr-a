import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';

@Component({
  selector: 'pokemon-list',
  standalone: true,
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PokemonCardComponent],
})
export class PokemonListComponent implements OnInit {
  public pokemons = input.required<SimplePokemon[]>();

  constructor() { }

  ngOnInit() {
  }

}
