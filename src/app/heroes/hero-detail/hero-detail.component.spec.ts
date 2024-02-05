import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../models/hero';
import { HeroService } from '../../services/hero/hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { Observable, of } from 'rxjs';
import { LocationService } from '../../services/location/location.service';

const heroMock = { ID: 1, name: 'Mock Hero', origin: 'imaginary' };

const heroServiceMock = {
  hero$: of(heroMock),
  getHeroById: (id: number): Observable<Hero> => of(heroMock),
};

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  const routeMock = {
    snapshot: {
      paramMap: {
        get: () => 1,
      },
    },
  };

  const locationServiceMock = {
    goBack: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: HeroService, useValue: heroServiceMock },
        { provide: LocationService, useValue: locationServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
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
      it('Then it should call the getHero method', () => {
        spyOn(component, 'getHero');

        component.ngOnInit();

        expect(component.getHero).toHaveBeenCalled();
      });
    });
  });

  describe('Given the getHero method', () => {
    describe('When it is called', () => {
      it('Then it should call the getHeroById method from heroService', () => {
        spyOn(heroServiceMock, 'getHeroById').and.callThrough();

        component.getHero();

        component['hero'].subscribe((hero) => {
          expect(hero).toEqual(heroMock);
        });
        expect(heroServiceMock.getHeroById).toHaveBeenCalledWith(1);
      });
    });
  });

  describe('Given the goBack method', () => {
    describe('When it is called', () => {
      it('Then it should call the goBack method from locationService', () => {
        spyOn(locationServiceMock, 'goBack');

        component.goBack();

        expect(locationServiceMock.goBack).toHaveBeenCalled();
      });
    });
  });
});
