import { Component, OnInit } from '@angular/core';

import { Hero } from '../shared/models/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private _heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this._heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

}
