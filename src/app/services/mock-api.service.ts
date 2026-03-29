import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of, map, tap } from 'rxjs';
import { Game } from '../models/game';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private gamesUrl = 'assets/data/games.json';
  private usersUrl = 'assets/data/users.json';
  private latency = 500; // Simulate network latency

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
      })
    );
  }

  getGameById(id: string): Observable<Game | undefined> {
    return this.http.get<Game[]>(this.gamesUrl).pipe(
      delay(this.latency),
      map(games => games.find(g => g.id === id))
    );
  }
}
