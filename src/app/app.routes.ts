import { Routes } from '@angular/router';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { HeroesPanelComponent } from './heroes/heroes-panel/heroes-panel.component';

export const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroesPanelComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
];
