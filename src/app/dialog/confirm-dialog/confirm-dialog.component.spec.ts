import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  const confirmDialogComponentMock = {
    close: (parameter: boolean) => {},
  } as unknown as MatDialogRef<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: confirmDialogComponentMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    component.dialogRef = confirmDialogComponentMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the onNoClick method', () => {
    describe('When it is called', () => {
      it('Then it should call the close method of the dialogRef with false', () => {
        spyOn(confirmDialogComponentMock, 'close').and.callThrough();

        component.onNoClick();

        expect(confirmDialogComponentMock.close).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Given the onYesClick method', () => {
    describe('When it is called', () => {
      it('Then it should call the close method of the dialogRef with true', () => {
        spyOn(confirmDialogComponentMock, 'close').and.callThrough();

        component.onYesClick();

        expect(confirmDialogComponentMock.close).toHaveBeenCalledWith(true);
      });
    });
  });
});
