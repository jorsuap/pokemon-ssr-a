import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons-page',
  standalone: true,
  templateUrl: './pokemons-page.component.html',
  styleUrls: ['./pokemons-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
})
export default class PokemonsPageComponent implements OnInit {
  public isLoading = signal(true);
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);
  public route = inject(ActivatedRoute);
  public router = inject(Router);
  private title = inject(Title);
  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      tap((page) => Math.max(1, page))
  ));
  // private appRef = inject(ApplicationRef);

  // private $appRef = this.appRef.isStable.subscribe((isStable) => {
  //   console.log('isStable', isStable);
  // });

  ngOnInit() {
    this.loadPokemons();
  }

  public loadPokemons(page: number = 0) {
    const pageToLoad = this.currentPage()! + page;
    this.pokemonsService.loadPage(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad }})),// actualizar la url
        tap(() => this.title.setTitle(`Pokemons - Page ${pageToLoad}`))
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }

}
