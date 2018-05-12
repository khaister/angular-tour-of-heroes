import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Hero } from '../shared/models/hero';
import { MessageService } from '../services/message.service';


@Injectable()
export class HeroService {

  private _heroesUrl = 'api/heroes';

  constructor(private _httpClient: HttpClient, private _messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // this._messageService.add(`HeroService: fetched ${HEROES.length} heroes`);
    return this._httpClient.get<Hero[]>(this._heroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    this._messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  private log(message: string) {
    this._messageService.add('HeroService: ' + message);
  }
}
