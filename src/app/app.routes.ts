import { Routes } from '@angular/router';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { HeroesPanelComponent } from './heroes/heroes-panel/heroes-panel.component';
import { AddModifyComponent } from './form/add-modify/add-modify.component';

export const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroesPanelComponent },
  { path: 'add', component: AddModifyComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'edit/:id', component: AddModifyComponent },
];
