import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


import { Hero } from '../shared/models/hero';
import { MessageService } from '../services/message.service';


@Injectable()
export class HeroService {

  private _heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private _httpClient: HttpClient, private _messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    // this._messageService.add(`HeroService: fetched ${HEROES.length} heroes`);
    return this._httpClient
      .get<Hero[]>(this._heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this._heroesUrl}/${id}`;
    return this._httpClient
      .get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id ${id}`)),
        catchError(this.handleError<Hero>(`getHero id ${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this._httpClient
      .put(this._heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`update hero id ${hero.id}`)),
        catchError(this.handleError<any>(`updateHero id ${hero.id}`))
      );
  }

  /**
   * Handles HTTP operation that failed
   * Lets the app continue
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this._messageService.add('HeroService: ' + message);
  }
}
