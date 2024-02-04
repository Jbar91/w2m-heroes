import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero/hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent implements OnInit {
  protected hero = this.heroService.hero$;

  constructor(
    private route: ActivatedRoute,
    protected heroService: HeroService
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  public getHero(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.heroService.getHeroById(id).subscribe();
  }
}
