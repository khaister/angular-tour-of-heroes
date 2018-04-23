import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { Hero } from '../shared/models/hero';
import { HEROES } from '../../assets/mock-heroes';
import { MessageService } from '../services/message.service';


@Injectable()
export class HeroService {

  constructor(private _messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this._messageService.add('HeroService: fetched the heroes');
    return of(HEROES);
  }
}
