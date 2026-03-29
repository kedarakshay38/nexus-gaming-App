import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, tap, map } from 'rxjs';
import { User } from '../models/user';
import { MOCK_USERS } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return of(MOCK_USERS).pipe(
      delay(500),
      map(users => {
        const user = users.find(u => u.email === email) || users[0];
        return user;
      }),
      tap(user => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
      })
    );
  }

  signup(email: string, username: string, password: string): Observable<User> {
    const newUser: User = {
      id: 'u-' + Math.random().toString(36).substr(2, 9),
      email,
      username,
      isAuthenticated: true,
      avatarUrl: 'assets/img/avatar.png',
      wishlistIds: []
    };
    
    return of(newUser).pipe(
      delay(500),
      tap(user => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
      })
    );
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }
}
