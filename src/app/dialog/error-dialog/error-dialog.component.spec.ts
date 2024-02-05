import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocationService } from '../../services/location/location.service';
import { ErrorDialogComponent } from './error-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ErrorDialogComponent', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;

  const errorDialogComponentMock = {
    close: (parameter: boolean) => {},
  } as unknown as MatDialogRef<ErrorDialogComponent>;

  const locationServiceMock = {
    goHome: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: errorDialogComponentMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: LocationService, useValue: locationServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the onGoHome method', () => {
    describe('When it is called', () => {
      it('Then it should call the close method of dialogRef', () => {
        spyOn(errorDialogComponentMock, 'close').and.callThrough();
        spyOn(locationServiceMock, 'goHome').and.callThrough();

        component.onGoHomeClick();

        expect(errorDialogComponentMock.close).toHaveBeenCalled();
        expect(locationServiceMock.goHome).toHaveBeenCalled();
      });
    });
  });
});
