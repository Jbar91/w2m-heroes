import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../models/hero';
import { HeroService } from '../../services/hero/hero.service';
import { LocationService } from '../../services/location/location.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'add-modify',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  templateUrl: './add-modify.component.html',
  styleUrl: './add-modify.component.scss',
})
export class AddModifyComponent implements OnInit {
  public hero: FormGroup;
  public heroLoaded: Hero | undefined = this.heroService.hero$.value;

  public origins = [
    { value: 'DC', viewValue: 'DC' },
    { value: 'Marvel', viewValue: 'Marvel' },
    { value: 'Imaginary', viewValue: 'Imaginary' },
    { value: 'Other', viewValue: 'Other' },
  ];

  public isEdit = false;
  protected id: string | null = null;

  constructor(
    private heroService: HeroService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {
    this.hero = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      origin: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.isEdit = this.route.snapshot.queryParams['isEdit'];
    if (this.isEdit) {
      this.loadHero();
    }

    this.hero.get('name')?.valueChanges.subscribe((value) => {
      this.hero
        .get('name')
        ?.setValue(value.toUpperCase(), { emitEvent: false });
    });
  }

  public addHero(): void {
    const heroToAdd = {
      ID: HeroService.generateID(),
      name: this.hero.value.name,
      origin: this.hero.value.origin,
    };

    this.heroService.addHero(heroToAdd).subscribe((response) => {
      if (response) {
        this.dialogService
          .loadingDialog('Hero added', true)
          .subscribe((response) => {
            if (response) {
              this.locationService.goBack();
            }
          });
      }
    });
  }

  public loadHero(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.heroService
      .getHeroById(parseInt(this.id!, 10))
      .subscribe((heroFound) => {
        if (heroFound) {
          this.heroLoaded = heroFound;
        }
      });

    if (this.heroLoaded) {
      this.hero.patchValue({
        name: this.heroLoaded.name,
        origin: this.heroLoaded.origin,
      });
    } else {
      this.dialogService.errorDialog('Hero not found').subscribe();
    }
  }

  public updateHero(): void {
    if (this.heroLoaded) {
      const heroToUpdate = {
        ID: this.heroLoaded.ID,
        name: this.hero.get('name')?.value,
        origin: this.hero.get('origin')?.value,
      };

      this.heroService.updateHero(heroToUpdate).subscribe((response) => {
        if (response) {
          this.dialogService
            .loadingDialog('Hero updated', true)
            .subscribe((response) => {
              if (response) {
                this.locationService.goBack();
              }
            });
        }
      });
    }
  }

  public goHome(): void {
    this.locationService.goHome();
  }

  public getErrorMessage(): string {
    if (this.hero.get('name')?.hasError('required')) {
      return 'Name is required';
    }

    return this.hero.get('name')?.hasError('minlength')
      ? 'Name must be at least 3 characters long'
      : '';
  }

  public isFormValid(): boolean {
    return this.hero.valid;
  }
}
