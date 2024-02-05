import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Hero } from '../../../models/hero';
import { HeroService } from '../../services/hero/hero.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'search-hero',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './search-hero.component.html',
  styleUrl: './search-hero.component.scss',
})
export class SearchHeroComponent {
  protected heroes: Observable<Hero[]> = of([]);
  public name: string = '';

  constructor(private heroService: HeroService) {}

  public searchHero(name: string): void {
    this.heroes = this.heroService.getHeroesByName(name);
  }
}
