import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'pokemon-list-skeleton',
  standalone: true,
  templateUrl: './pokemon-list-skeleton.component.html',
  styleUrls: ['./pokemon-list-skeleton.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListSkeletonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
