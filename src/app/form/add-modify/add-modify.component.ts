import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../models/hero';
import { HeroService } from '../../services/hero/hero.service';
import { LocationService } from '../../services/location/location.service';

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
    private route: ActivatedRoute
  ) {
    this.hero =new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      origin: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
    this.isEdit = this.route.snapshot.queryParams['isEdit'];
    if (this.isEdit) {
      this.loadHero();
    }
  }

  public addHero() {
    const heroToAdd = {
      ID: HeroService.generateID(),
      name: this.hero.value.name,
      origin: this.hero.value.origin,
    };

    // this.heroService.addHero(heroToAdd);
    console.log(this.hero, heroToAdd)
    // this.locationService.goBack();
  }

  public loadHero() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHeroById(parseInt(this.id!, 10));
    const heroLoaded = this.heroService.hero$.value
    
    if (heroLoaded){
      this.hero.patchValue({
        name: heroLoaded.name,
        origin: heroLoaded.origin
      })
    }
  }

  public updateHero() {
    const heroToUpdate = {
      // ID: this.hero.ID,
      // name: this.hero.name,
      // origin: this.hero.origin,
    };

    // this.heroService.updateHero(heroToUpdate);
    this.locationService.goBack();
  }

  public goHome() {
    this.locationService.goHome();
  }
}
