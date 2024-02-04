import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddModifyComponent } from './add-modify.component';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, of } from 'rxjs';
import { Hero } from '../../../models/hero';
import { HeroService } from '../../services/hero/hero.service';
import { LocationService } from '../../services/location/location.service';

describe('AddModifyComponent', () => {
  let component: AddModifyComponent;
  let fixture: ComponentFixture<AddModifyComponent>;

  const routeMock = {
    snapshot: {
      queryParams: {
        isEdit: false,
      },
      paramMap: {
        get: () => 1,
      },
    },
  };

  const heroMock = {
    ID: 1,
    name: 'HeroMock',
    origin: 'TOEI',
  };

  const updatedHeroMock = {
    ID: 1,
    name: 'HeroMockUpdated',
    origin: 'TOEI',
  };

  const heroServiceMock = {
    hero$: new BehaviorSubject(heroMock),
    getHeroById: (id: number) => of(heroMock),
    addHero: (hero: Hero) => () => {},
    updateHero: (hero: Hero) => of(updatedHeroMock),
  };

  const locationServiceMock = {
    goBack: () => {},
    goHome: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddModifyComponent, NoopAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: HeroService, useValue: heroServiceMock },
        { provide: LocationService, useValue: locationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the ngOnInit method', () => {
    describe('When it is called & isEdit is true', () => {
      it('Then it should call loadHero', () => {
        spyOn(component, 'loadHero');
        routeMock.snapshot.queryParams.isEdit = true;

        component.ngOnInit();

        expect(component.loadHero).toHaveBeenCalled();
      });
    });
  });

  describe('Given the addHero method', () => {
    describe('When it is called', () => {
      it('Then it should call heroService.addHero with a valid hero & call locationService.goBack', () => {
        spyOn(heroServiceMock, 'addHero').and.callThrough();
        spyOn(locationServiceMock, 'goBack').and.callThrough();

        component.addHero();

        expect(heroServiceMock.addHero).toHaveBeenCalled();
        expect(locationServiceMock.goBack).toHaveBeenCalled();
      });
    });
  });

  describe('Given the loadHero method', () => {
    describe('When it is called', () => {
      it('Then it should call heroService.getHeroById & set the hero property', () => {
        spyOn(heroServiceMock, 'getHeroById').and.callThrough();
        spyOn(heroServiceMock.hero$, 'next').and.callThrough();

        component.loadHero();

        expect(heroServiceMock.getHeroById).toHaveBeenCalledWith(
          routeMock.snapshot.paramMap.get()
        );
        expect(component.hero).toEqual(heroMock);
      });
    });
  });

  describe('Given the updateHero method', () => {
    describe('When it is called', () => {
      it('Then it should call heroService.updatehero with a valid hero & call locationService.goBack', () => {
        spyOn(heroServiceMock, 'updateHero').and.callThrough();
        spyOn(locationServiceMock, 'goBack').and.callThrough();

        component.updateHero();

        expect(heroServiceMock.updateHero).toHaveBeenCalled();
        expect(locationServiceMock.goBack).toHaveBeenCalled();
      });
    });
  });

  describe('Given the goHome method', () => {
    describe('When it is called', () => {
      it('Then it should call locationService.goHome', () => {
        spyOn(locationServiceMock, 'goHome').and.callThrough();

        component.goHome();

        expect(locationServiceMock.goHome).toHaveBeenCalled();
      });
    });
  });
});
