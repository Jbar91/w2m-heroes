import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ErrorDialogComponent } from '../../dialog/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public confirmDialog(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: message,
      },
    });

    return dialogRef.afterClosed();
  }

  public errorDialog(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {
        message: message,
      },
    });

    return dialogRef.afterClosed();
  }
}
