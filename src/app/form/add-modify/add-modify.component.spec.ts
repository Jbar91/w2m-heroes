import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddModifyComponent } from './add-modify.component';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Hero } from '../../../models/hero';
import { HeroService } from '../../services/hero/hero.service';
import { LocationService } from '../../services/location/location.service';
import { DialogService } from '../../services/dialog/dialog.service';

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
    getHeroById: (id: number): Observable<Hero | undefined> => of(heroMock),
    addHero: (hero: Hero) => of(true),
    updateHero: (hero: Hero) => of(updatedHeroMock),
  };

  const locationServiceMock = {
    goBack: () => {},
    goHome: () => {},
  };

  const dialogServiceMock = {
    errorDialog: (message: string) => of(),
    loadingDialog: (message: string, disableClose?: boolean) => of(true),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddModifyComponent, NoopAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: HeroService, useValue: heroServiceMock },
        { provide: LocationService, useValue: locationServiceMock },
        { provide: DialogService, useValue: dialogServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifyComponent);
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
        heroServiceMock.getHeroById = () => of(heroMock);
        spyOn(heroServiceMock, 'getHeroById').and.callThrough();
        spyOn(heroServiceMock.hero$, 'next').and.callThrough();

        component.loadHero();

        expect(heroServiceMock.getHeroById).toHaveBeenCalledWith(
          routeMock.snapshot.paramMap.get()
        );
        expect(component.heroLoaded).toEqual(heroMock);
      });
    });

    describe('When it is called & heroLoaded is false', () => {
      it('Then it should call dialogService.errorDialog', () => {
        heroServiceMock.getHeroById = () => of(undefined);
        spyOn(dialogServiceMock, 'errorDialog').and.callThrough();
        component.heroLoaded = undefined;

        component.loadHero();

        expect(dialogServiceMock.errorDialog).toHaveBeenCalledWith(
          'Hero not found'
        );
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

  describe('Given the getErrorMessage method', () => {
    describe('When it is called and the name field is falsy', () => {
      it('Then it should return "Name is required"', () => {
        component.hero.get('name')?.setErrors({ required: true });

        expect(component.getErrorMessage()).toEqual('Name is required');
      });
    });

    describe('When it is called and the name field is truthy but less than 3 characters long', () => {
      it('Then it should return "Name must be at least 3 characters long"', () => {
        component.hero.get('name')?.setErrors({ minlength: true });

        expect(component.getErrorMessage()).toEqual(
          'Name must be at least 3 characters long'
        );
      });
    });

    describe('When it is called and the name field is truthy and more than 3 characters long', () => {
      it('Then it should return an empty string', () => {
        component.hero.get('name')?.setErrors(null);

        expect(component.getErrorMessage()).toEqual('');
      });
    });
  });
});
