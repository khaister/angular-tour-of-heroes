import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../shared/models/hero';
import { HeroService } from '../services/hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private _heroService: HeroService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location
  ) { }

  @Input()
  hero: Hero;

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this._activatedRoute.snapshot.paramMap.get('id');
    this._heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

}
