import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesPanelComponent } from './heroes-panel/heroes-panel.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HeroesPanelComponent, HeroDetailComponent],
  imports: [CommonModule, RouterModule, MatButtonModule],
  exports: [HeroesPanelComponent, HeroDetailComponent],
})
export class HeroesModule {}
