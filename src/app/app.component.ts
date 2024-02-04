import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroesModule } from './heroes/heroes.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroesModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'W2M Superheroes';
}
