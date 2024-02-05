import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocationService } from '../../services/location/location.service';
import { LoadingDialogComponent } from './loading-dialog.component';

describe('LoadingDialogComponent', () => {
  let component: LoadingDialogComponent;
  let fixture: ComponentFixture<LoadingDialogComponent>;

  const loadingDialogComponentMock = {
    close: (parameter: boolean) => {},
  } as unknown as MatDialogRef<LoadingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: loadingDialogComponentMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the onLoadAction method', () => {
    describe('When it is called', () => {
      it('Then it should set loaded to true after a second', fakeAsync(() => {
        component.onLoadAction();
        tick(1000);

        expect(component.loaded).toBeTrue();
      }));
    });
  });

  describe('Given the onClick method', () => {
    describe('When it is called', () => {
      it('Then it should call the close method of dialogRef', () => {
        spyOn(loadingDialogComponentMock, 'close').and.callThrough();

        component.onClick();

        expect(loadingDialogComponentMock.close).toHaveBeenCalled();
      });
    });
  });
});
