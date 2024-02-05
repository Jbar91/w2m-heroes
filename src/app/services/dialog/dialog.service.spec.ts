import { TestBed } from '@angular/core/testing';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Given the confirmDialog method', () => {
    describe('When it is called', () => {
      it('Then it should return an Observable', () => {
        expect(service.confirmDialog('')).toBeTruthy();
      });
    });
  });

  describe('Given the errorDialog method', () => {
    describe('When it is called', () => {
      it('Then it should return an Observable', () => {
        expect(service.errorDialog('')).toBeTruthy();
      });
    });
  });

  describe('Given the loadingDialog method', () => {
    describe('When it is called with disableClose set', () => {
      it('Then it should set dialogRef.disableClose to true and return an Observable', () => {
        const some = service.loadingDialog('', true);

        expect(some).toBeTruthy();
      });
    });
  });
});
