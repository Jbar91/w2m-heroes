import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { Hero } from '../../../models/hero';
import { HeroService } from '../../services/hero/hero.service';
import { HeroesPanelComponent } from './heroes-panel.component';
import { DialogService } from '../../services/dialog/dialog.service';

const heroesMock: Hero[] = [{ ID: 1, name: 'Mock Hero', origin: 'imaginary' }];

const heroServiceMock = {
  heroes$: of(heroesMock),
  totalHeroes$: new BehaviorSubject(heroesMock),
  getHeroes: () => of(heroesMock),
  count: 3,
  page: 1,
  loadNextHeroes: () => {},
  loadPrevHeroes: () => {},
  deleteHero: (id: number) => {},
};

const dialogServiceMock = {
  confirmDialog: (message: string) => of(true),
  loadingDialog: (message: string, disableClose?: boolean) => of(),
};

describe('HeroesPanelComponent', () => {
  let component: HeroesPanelComponent;
  let fixture: ComponentFixture<HeroesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesPanelComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceMock },
        { provide: DialogService, useValue: dialogServiceMock },
      ],
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

  describe('Given the loadNextHeroes method', () => {
    describe('When it is called', () => {
      it('Then it should call loadNextHeroes from heroService', () => {
        spyOn(heroServiceMock, 'loadNextHeroes').and.callThrough();

        component.loadNextHeroes();

        expect(heroServiceMock.loadNextHeroes).toHaveBeenCalled();
      });
    });
  });

  describe('Given the loadPrevHeroes method', () => {
    describe('When it is called', () => {
      it('Then it should call loadPrevHeroes from heroService', () => {
        spyOn(heroServiceMock, 'loadPrevHeroes').and.callThrough();

        component.loadPrevHeroes();

        expect(heroServiceMock.loadPrevHeroes).toHaveBeenCalled();
      });
    });
  });

  describe('Given the disableNextButton method', () => {
    describe('When it is called', () => {
      it('Then it should return true if the count is equal or greater than the totalHeroes length', () => {
        heroServiceMock.count = 23;
        heroServiceMock.totalHeroes$.next(heroesMock);

        expect(component.disableNextButton()).toBe(true);
      });

      it('Then it should return false if the count is less than the totalHeroes length', () => {
        heroServiceMock.count = 0;
        heroServiceMock.totalHeroes$.next(heroesMock);

        expect(component.disableNextButton()).toBe(false);
      });
    });
  });

  describe('Given the disablePrevButton method', () => {
    describe('When it is called', () => {
      it('Then it should return true if the page is equal to 1', () => {
        heroServiceMock.page = 1;

        expect(component.disablePrevButton()).toBe(true);
      });

      it('Then it should return false if the page is greater than 1', () => {
        heroServiceMock.page = 2;

        expect(component.disablePrevButton()).toBe(false);
      });
    });
  });

  describe('Given the deleteHero method', () => {
    describe('When it is called with a valid id', () => {
      it('Then it should call deleteHero from heroService', () => {
        spyOn(heroServiceMock, 'deleteHero').and.callThrough();
        spyOn(dialogServiceMock, 'confirmDialog').and.callThrough();

        component.deleteHero(1);

        expect(heroServiceMock.deleteHero).toHaveBeenCalledWith(1);
      });
    });
  });
});
