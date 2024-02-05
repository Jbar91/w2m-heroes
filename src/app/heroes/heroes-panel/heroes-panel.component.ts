import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero/hero.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'heroes-panel',
  templateUrl: './heroes-panel.component.html',
  styleUrl: './heroes-panel.component.scss',
})
export class HeroesPanelComponent implements OnInit {
  protected heroes = this.heroService.heroes$;

  constructor(
    protected heroService: HeroService,
    private dialogService: DialogService
  ) {}

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
    this.dialogService
      .confirmDialog('Are you sure you want to delete this hero?')
      .subscribe((result) => {
        if (result) {
          this.dialogService.loadingDialog('Hero deleted').subscribe();
          this.heroService.deleteHero(id);
        }
      });
  }
}
