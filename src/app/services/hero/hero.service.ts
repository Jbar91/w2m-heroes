import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Hero } from '../../../models/hero';
import { heroes } from '../../../mocks/heroes-initial-values';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  public heroes$ = new BehaviorSubject<Hero[]>([]);
  public totalHeroes$ = new BehaviorSubject<Hero[]>([]);
  public hero$ = new BehaviorSubject<Hero | undefined>(undefined);

  public offset = 0;
  public page = 1;
  public count = 3;
  public limit = 3;

  constructor() {}

  public getHeroes(): Observable<Hero[]> {
    if (!this.totalHeroes$.value.length) {
      this.totalHeroes$.next(heroes);
    }

    this.totalHeroes$.subscribe((heroes) => {
      const newHeroes = heroes.slice(this.offset, this.offset + this.limit);
      this.heroes$.next(newHeroes);
    });

    return this.totalHeroes$;
  }

  public loadNextHeroes(): void {
    this.offset += 3;
    this.count += 3;
    this.page++;

    this.totalHeroes$.subscribe((heroes) => {
      heroes.slice(this.offset, this.offset + this.limit);
      this.heroes$.next(heroes);
    });

    this.getHeroes();
  }

  public loadPrevHeroes(): void {
    this.offset -= 3;
    this.page--;
    this.count -= 3;

    this.totalHeroes$.subscribe((heroes) => {
      heroes.slice(this.offset, this.offset + this.limit);
      this.heroes$.next(heroes);
    });

    this.getHeroes();
  }

  public getHeroById(id: number): Observable<Hero | undefined> {
    this.totalHeroes$
      .pipe(map((heroes) => heroes.find((hero) => hero.ID === id)))
      .subscribe((hero) => this.hero$.next(hero));

    return this.hero$;
  }

  public getHeroesByName(name: string): Observable<Hero[]> {
    if (name) {
      return this.totalHeroes$.pipe(
        map((heroes) =>
          heroes.filter((hero) =>
            hero.name.toLowerCase().includes(name.toLowerCase())
          )
        )
      );
    } else {
      return of([]);
    }
  }

  public addHero(hero: Hero): Observable<Hero> {
    const newHeroes = [...this.totalHeroes$.value, hero];
    this.totalHeroes$.next(newHeroes);

    return of(hero);
  }

  public updateHero(hero: Hero): Observable<Hero> {
    const updatedHeroes = this.totalHeroes$.value.map((heroToUpdate) =>
      hero.ID === heroToUpdate.ID ? hero : heroToUpdate
    );
    this.totalHeroes$.next(updatedHeroes);

    return of(hero);
  }

  public deleteHero(id: number): void {
    const deletedHeroes = this.totalHeroes$.value.filter(
      (hero) => hero.ID !== id
    );
    this.totalHeroes$.next(deletedHeroes);
  }

  public static generateID(): number {
    return crypto.getRandomValues(new Uint32Array(1))[0];
  }
}
