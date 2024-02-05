import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHeroComponent } from './search-hero.component';
import { Hero } from '../../../models/hero';
import { of } from 'rxjs';
import { HeroService } from '../../services/hero/hero.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SearchHeroComponent', () => {
  let component: SearchHeroComponent;
  let fixture: ComponentFixture<SearchHeroComponent>;

  const heroesMock: Hero[] = [{ ID: 1, name: 'superman', origin: 'DC' }];

  const heroServiceMock = {
    getHeroesByName: (name: string) => of(heroesMock),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchHeroComponent, NoopAnimationsModule],
      providers: [{ provide: HeroService, useValue: heroServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the searchHero method', () => {
    describe('When it is called with a valid name', () => {
      it('Then it should reuturn the list of heroes with the given name', () => {
        spyOn(heroServiceMock, 'getHeroesByName').and.callThrough();
        const name = 'man';
        const expectedHero = heroesMock[0];

        component.searchHero(name);

        component['heroes'].subscribe((response) =>
          expect(response).toEqual([expectedHero])
        );
      });
    });
  });
});
