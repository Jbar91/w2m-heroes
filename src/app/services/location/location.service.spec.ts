import { TestBed } from '@angular/core/testing';
import { LocationService } from './location.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('LocationService', () => {
  let service: LocationService;

  const locationMock = {
    back: () => {},
  };

  const routerMock = {
    navigate: (route: any[]) => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Location, useValue: locationMock },
        { provide: Router, useValue: routerMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(LocationService);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Given the goBack method', () => {
    describe('When it is called', () => {
      it('Then it should call location.back', () => {
        spyOn(locationMock, 'back').and.callThrough();

        service.goBack();

        expect(locationMock.back).toHaveBeenCalled();
      });
    });
  });

  describe('Given the goHome method', () => {
    describe('When it is called', () => {
      it('Then it should call router.navigate with /', () => {
        spyOn(routerMock, 'navigate').and.callThrough();

        service.goHome();

        expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
      });
    });
  });
});
