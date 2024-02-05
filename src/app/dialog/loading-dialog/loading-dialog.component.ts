import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { delay, of, tap } from 'rxjs';

@Component({
  selector: 'loading-dialog',
  standalone: true,
  imports: [MatDialogModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './loading-dialog.component.html',
  styleUrl: './loading-dialog.component.scss',
})
export class LoadingDialogComponent {
  public disableClose: boolean = false;
  public loaded = false;

  constructor(
    public dialogRef: MatDialogRef<LoadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
    dialogRef.disableClose = this.disableClose;
  }

  public onLoadAction(): void {
    of(null)
      .pipe(
        delay(1000),
        tap(() => {
          this.loaded = true;
        })
      )
      .subscribe();
  }

  public onClick(): void {
    this.dialogRef.close(true);
  }
}
