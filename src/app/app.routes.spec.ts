import { TestBed } from "@angular/core/testing";
import { routes } from "./app.routes";
import { provideRouter, Router } from "@angular/router";
import { Location } from "@angular/common";

describe('AppRoutes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
        provideRouter(routes),
      ],
    });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to "about" when the user clicks on the "About" link', async () => {
    await router.navigate(['about'])
    expect(location.path()).toBe('/about');
  });

  it('should navigate to "pokemon/1" when the user clicks on the "Pokemon" link', async () => {
    await router.navigate(['pokemons/page/1'])
    expect(location.path()).toBe('/pokemons/page/1');
  });

  it('should load proper component when navigating to a route', async () => {
    const aboutRoute = routes.find(route => route.path === 'about')!;
    expect(aboutRoute).toBeDefined();

    const aboutComponent = await aboutRoute.loadComponent!() as any;
    expect(aboutComponent.default.name).toBe('AboutPageComponent');
  });

  it('should load proper component when navigating to a route with a parameter', async () => {
    const pokemonsRoute = routes.find(route => route.path === 'pokemons/page/:page')!;
    expect(pokemonsRoute).toBeDefined();

    const pokemonsComponent = await pokemonsRoute.loadComponent!() as any;
    expect(pokemonsComponent.default.name).toBe('PokemonsPageComponent');
  });
});