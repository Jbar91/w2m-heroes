import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'heroes-panel',
  templateUrl: './heroes-panel.component.html',
  styleUrl: './heroes-panel.component.sass',
})
export class HeroesPanelComponent implements OnInit {
  protected heroes = this.heroService.heroes$;

  constructor(protected heroService: HeroService) {}

  ngOnInit() {
    this.heroService.getHeroes().subscribe();
  }
}
