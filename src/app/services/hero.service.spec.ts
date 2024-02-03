import { TestBed } from '@angular/core/testing';
import { heroes } from '../../mocks/heroes-initial-values';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
    service.heroes$.next(heroes);

    spyOn(service.heroes$, 'next').and.callThrough();
    spyOn(service.hero$, 'next').and.callThrough();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Given the getHeroes method', () => {
    describe('When it is called', () => {
      it('Then it should return the list of heroes if the heroes$ length value is falsy', () => {
        service.heroes$.next([]);

        service
          .getHeroes()
          .subscribe((response) => expect(response).toEqual(heroes));

        expect(service.heroes$.next).toHaveBeenCalledWith(heroes);
      });
    });
  });

  describe('Given the getHeroById method', () => {
    describe('When it is called with a valid ID', () => {
      it('Then it should return given hero', () => {
        const hero = heroes[0];

        service
          .getHeroById(hero.ID)
          .subscribe((response) => expect(response).toEqual(hero));

        expect(service.hero$.next).toHaveBeenCalledWith(hero);
      });
    });
  });

  describe('Given the getHeroesByName method', () => {
    describe('When it is called with a valid name', () => {
      it('Then it should return the list of heroes with the given name', () => {
        service.getHeroesByName('Spider').subscribe((response) => {
          expect(response).toEqual([heroes[0]]);
        });
      });
    });
  });

  describe('Given the addHero methos', () => {
    describe('When it is called with a valid hero', () => {
      it('Then it should add the hero to the list of heroes', () => {
        const newHero = {
          ID: HeroService.generateID(),
          name: 'New Hero',
          origin: 'Imaginary',
        };

        const originalHeroes = service.heroes$.value.length;

        service.addHero(newHero);

        const modifiedHeroes = service.heroes$.value.length;

        expect(originalHeroes).toBeLessThan(modifiedHeroes);
        expect(service.heroes$.value).toContain(newHero);
      });
    });
  });

  describe('Given the updateHero method', () => {
    describe('When it is called with a valid hero', () => {
      it('Then it should update the hero in the list', () => {
        const hero = heroes[0];
        const modifiedHero = { ...hero, name: 'Modified Hero' };

        service.updateHero(modifiedHero);

        const heroUpdated = service.heroes$.value[0];

        expect(heroUpdated).toEqual(modifiedHero);
        expect(service.heroes$.value).toContain(modifiedHero);
      });
    });
  });

  describe('Given the deleteHero method', () => {
    describe('When it is called with a valid ID', () => {
      it('Then it should delete the hero from the list', () => {
        const hero = heroes[0];

        const originalHeroes = service.heroes$.value.length;

        service.deleteHero(hero.ID);

        const modifiedHeroes = service.heroes$.value.length;

        expect(originalHeroes).toBeGreaterThan(modifiedHeroes);
        expect(service.heroes$.value).not.toContain(hero);
      });
    });
  });
});
