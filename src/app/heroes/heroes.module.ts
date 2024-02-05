import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesPanelComponent } from './heroes-panel/heroes-panel.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SearchHeroComponent } from '../search/search-hero/search-hero.component';

@NgModule({
  declarations: [HeroesPanelComponent, HeroDetailComponent],
  imports: [CommonModule, RouterModule, MatButtonModule, SearchHeroComponent],
  exports: [HeroesPanelComponent, HeroDetailComponent],
})
export class HeroesModule {}
