import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Hero } from '../../models/hero';
import { heroes } from '../../mocks/heroes-initial-values';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  public heroes$ = new BehaviorSubject<Hero[]>([]);
  public hero$ = new BehaviorSubject<Hero | undefined>(undefined);

  constructor() {}

  public getHeroes(): Observable<Hero[]> {
    if (!this.heroes$.value.length) {
      this.heroes$.next(heroes);
    }

    return this.heroes$;
  }

  public getHeroById(id: number): Observable<Hero | undefined> {
    this.heroes$
      .pipe(map((heroes) => heroes.find((hero) => hero.ID === id)))
      .subscribe((hero) => this.hero$.next(hero));

    return this.hero$;
  }

  public getHeroesByName(name: string): Observable<Hero[]> {
    return this.heroes$.pipe(
      map((heroes) =>
        heroes.filter((hero) =>
          hero.name.toLowerCase().includes(name.toLowerCase())
        )
      )
    );
  }

  public addHero(hero: Hero): void {
    const newHeroes = [...this.heroes$.value, hero];
    this.heroes$.next(newHeroes);
  }

  public updateHero(hero: Hero): void {
    const updatedHeroes = this.heroes$.value.map((heroes) =>
      hero.ID === heroes.ID ? hero : heroes
    );
    this.heroes$.next(updatedHeroes);
  }

  public deleteHero(id: number): void {
    this.heroes$.next(this.heroes$.value.filter((hero) => hero.ID !== id));
  }

  public static generateID(): number {
    return crypto.getRandomValues(new Uint32Array(1))[0];
  }
}
