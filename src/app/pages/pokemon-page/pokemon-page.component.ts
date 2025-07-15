import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  templateUrl: './pokemon-page.component.html',
  styleUrls: ['./pokemon-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {

  public pokemon = signal<Pokemon | null>(null);
  private pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.pokemonsService.getPokemon(id)
      .pipe(
        tap(({name, id}) => {
          const pageTitle = `#${ id } - ${ name }`;
          const pageDescription = `Pagina del pokemon ${name} - #${id}`;
          this.title.setTitle(pageTitle);
          this.meta.updateTag({name: 'description', content: pageDescription});
          this.meta.updateTag({name: 'og:title', content: pageTitle});
          this.meta.updateTag({name: 'og:description', content: pageDescription});
          this.meta.updateTag({name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`});
        })
      )
      .subscribe(this.pokemon.set);
  }

}
