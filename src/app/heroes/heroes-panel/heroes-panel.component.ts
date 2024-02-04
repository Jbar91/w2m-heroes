import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero/hero.service';

@Component({
  selector: 'heroes-panel',
  templateUrl: './heroes-panel.component.html',
  styleUrl: './heroes-panel.component.scss',
})
export class HeroesPanelComponent implements OnInit {
  protected heroes = this.heroService.heroes$;

  constructor(protected heroService: HeroService) {}

  ngOnInit() {
    this.heroService.getHeroes().subscribe();
  }

  public loadNextHeroes(): void {
    this.heroService.loadNextHeroes();
  }

  public loadPrevHeroes(): void {
    this.heroService.loadPrevHeroes();
  }

  public disableNextButton(): boolean {
    return this.heroService.count >= this.heroService.totalHeroes$.value.length;
  }

  public disablePrevButton(): boolean {
    return this.heroService.page === 1;
  }

  public deleteHero(id: number): void {
    this.heroService.deleteHero(id);
  }
}
