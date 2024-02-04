import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Hero } from '../../../models/hero';
import { HeroService } from '../../services/hero.service';
import { HeroesPanelComponent } from './heroes-panel.component';

const heroesMock: Hero[] = [{ ID: 1, name: 'Mock Hero', origin: 'imaginary' }];

const heroServiceMock = {
  heroes$: of(heroesMock),
  getHeroes: () => of(heroesMock),
};

describe('HeroesPanelComponent', () => {
  let component: HeroesPanelComponent;
  let fixture: ComponentFixture<HeroesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesPanelComponent],
      providers: [{ provide: HeroService, useValue: heroServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the ngOnInit method', () => {
    describe('When it is called', () => {
      it('Then in should call getHeroes from heroService', () => {
        spyOn(heroServiceMock, 'getHeroes').and.callThrough();

        component.ngOnInit();

        component['heroes'].subscribe((heroes) => {
          expect(heroes).toEqual(heroesMock);
        });
        expect(heroServiceMock.getHeroes).toHaveBeenCalled();
      });
    });
  });
});
