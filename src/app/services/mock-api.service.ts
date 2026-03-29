import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { Game } from '../models/game';
import { MOCK_GAMES } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private latency = 500;

  getGames(search?: string, genre?: string, sort?: string): Observable<Game[]> {
    return of(MOCK_GAMES).pipe(
      delay(this.latency),
      map(games => {
        let results = [...games];
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
      })
    );
  }

  getGameById(id: string): Observable<Game | undefined> {
    return of(MOCK_GAMES).pipe(
      delay(this.latency),
      map(games => {
        const game = games.find(g => g.id === id);
        if (!game) throw new Error('Game not found');
        return game;
      })
    );
  }
}
