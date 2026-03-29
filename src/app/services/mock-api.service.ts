import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, delay, map, catchError, throwError } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private gamesUrl = 'assets/data/games.json';
  private latency = 500;

  constructor(private http: HttpClient) { }

  getGames(search?: string, genre?: string, sort?: string): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl).pipe(
      delay(this.latency),
      map(games => {
        let results = games;
        if (search) {
          const lowerSearch = search.toLowerCase();
          results = results.filter(g => g.title.toLowerCase().includes(lowerSearch));
        }
        if (genre) {
          results = results.filter(g => g.genre.includes(genre));
        }
        if (sort === 'priceAsc') {
          results.sort((a, b) => a.price - b.price);
        } else if (sort === 'priceDesc') {
          results.sort((a, b) => b.price - a.price);
        }
        return results;
      }),
      catchError(this.handleError)
    );
  }

  getGameById(id: string): Observable<Game | undefined> {
    return this.http.get<Game[]>(this.gamesUrl).pipe(
      delay(this.latency),
      map(games => {
        const game = games.find(g => g.id === id);
        if (!game) throw new Error('Game not found');
        return game;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse | Error) {
    let errorMessage = 'An unknown error occurred!';
    if (error instanceof HttpErrorResponse) {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    } else {
      errorMessage = error.message;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
