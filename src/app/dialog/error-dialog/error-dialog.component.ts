import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { LocationService } from '../../services/location/location.service';

@Component({
  selector: 'error-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss',
})
export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private locationService: LocationService
  ) {}

  onGoHomeClick(): void {
    this.dialogRef.close();
    this.locationService.goHome();
  }
}
