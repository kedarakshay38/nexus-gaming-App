import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistIdsSubject = new BehaviorSubject<string[]>([]);
  public wishlistIds$ = this.wishlistIdsSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined') {
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        this.wishlistIdsSubject.next(JSON.parse(storedWishlist));
      }
    }
  }

  get wishlistIdsValue(): string[] {
    return this.wishlistIdsSubject.value;
  }

  toggleWishlist(gameId: string) {
    const currentIds = this.wishlistIdsValue;
    const index = currentIds.indexOf(gameId);

    let updatedIds;
    if (index > -1) {
      updatedIds = currentIds.filter(id => id !== gameId);
    } else {
      updatedIds = [...currentIds, gameId];
    }

    this.updateWishlist(updatedIds);
  }

  isInWishlist(gameId: string): boolean {
    return this.wishlistIdsValue.includes(gameId);
  }

  private updateWishlist(ids: string[]) {
    this.wishlistIdsSubject.next(ids);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(ids));
    }
  }
}
