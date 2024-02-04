import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeroService } from '../../services/hero/hero.service';
import { CommonModule, Location } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../../models/hero';
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
    CommonModule,
  ],
  providers: [],
  templateUrl: './add-modify.component.html',
  styleUrl: './add-modify.component.scss',
})
export class AddModifyComponent implements OnInit {
  public hero: Hero = {
    name: '',
    origin: '',
    ID: 0,
  };

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
  ) {}

  ngOnInit() {
    this.isEdit = this.route.snapshot.queryParams['isEdit'];
    if (this.isEdit) {
      this.loadHero();
    }
  }

  public addHero() {
    const heroToAdd = {
      ID: HeroService.generateID(),
      name: this.hero.name,
      origin: this.hero.origin,
    };

    this.heroService.addHero(heroToAdd);
    this.locationService.goBack();
  }

  public loadHero() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHeroById(parseInt(this.id!, 10));
    this.hero = this.heroService.hero$.value!;
  }

  public updateHero() {
    const heroToUpdate = {
      ID: this.hero.ID,
      name: this.hero.name,
      origin: this.hero.origin,
    };

    this.heroService.updateHero(heroToUpdate);
    this.locationService.goBack();
  }

  public goHome() {
    this.locationService.goHome();
  }
}
