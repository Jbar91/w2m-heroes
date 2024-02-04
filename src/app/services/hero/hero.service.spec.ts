import { TestBed } from '@angular/core/testing';
import { heroes } from '../../../mocks/heroes-initial-values';
import { HeroService } from './hero.service';
import { of } from 'rxjs';

describe('HeroService', () => {
  let service: HeroService;

  const heroesPage1 = heroes.slice(0, 3);
  const heroesPage2 = heroes.slice(3, 6);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
    service.totalHeroes$.next(heroes);

    spyOn(service.heroes$, 'next').and.callThrough();
    spyOn(service.totalHeroes$, 'next').and.callThrough();
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
        service.totalHeroes$.next([]);

        service
          .getHeroes()
          .subscribe((response) => expect(response).toEqual(heroes));

        expect(service.heroes$.next).toHaveBeenCalledWith(heroesPage1);
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

  describe('Given the addHero method', () => {
    describe('When it is called with a valid hero', () => {
      it('Then it should add the hero to the list of heroes', () => {
        const newHero = {
          ID: HeroService.generateID(),
          name: 'New Hero',
          origin: 'Imaginary',
        };

        const originalHeroes = service.totalHeroes$.value.length;

        service.addHero(newHero);

        const modifiedHeroes = service.totalHeroes$.value.length;

        expect(originalHeroes).toBeLessThan(modifiedHeroes);
        expect(service.totalHeroes$.value).toContain(newHero);
      });
    });
  });

  describe('Given the updateHero method', () => {
    describe('When it is called with a valid hero', () => {
      it('Then it should update the hero in the list', () => {
        const hero = heroes[0];
        const modifiedHero = { ...hero, name: 'Modified Hero' };

        service.updateHero(modifiedHero);

        const heroUpdated = service.totalHeroes$.value[0];

        service.totalHeroes$.subscribe((heroes) => {
          expect(heroes).toContain(modifiedHero);
        });
        expect(heroUpdated).toEqual(modifiedHero);
      });
    });
  });

  describe('Given the deleteHero method', () => {
    describe('When it is called with a valid ID', () => {
      it('Then it should delete the hero from the list', () => {
        const hero = heroes[0];

        const originalHeroes = service.totalHeroes$.value.length;

        service.deleteHero(hero.ID);

        const modifiedHeroes = service.totalHeroes$.value.length;

        expect(originalHeroes).toBeGreaterThan(modifiedHeroes);
        expect(service.totalHeroes$.value).not.toContain(hero);
      });
    });
  });

  describe('Given the loadNextHeroes method', () => {
    describe('When it is called', () => {
      it('Then it should call heroes$.next with the 2nd page of heroes, add 3 to the offset & count properties & add 1 to the page property', () => {
        service.loadNextHeroes();

        expect(service.heroes$.next).toHaveBeenCalledWith(heroesPage2);
        expect(service.offset).toBe(3);
        expect(service.count).toBe(6);
        expect(service.page).toBe(2);
      });
    });
  });

  describe('Given the loadPrevHeroes method', () => {
    describe('When it is called', () => {
      it('Then it should call heroes$.next with the 1st page of heroes, subtract 3 from the offset & count properties & subtract 1 from the page property', () => {
        service.offset = 3;
        service.count = 6;
        service.page = 2;

        service.loadPrevHeroes();

        expect(service.heroes$.next).toHaveBeenCalledWith(heroesPage1);
        expect(service.offset).toBe(0);
        expect(service.count).toBe(3);
        expect(service.page).toBe(1);
      });
    });
  });
});
