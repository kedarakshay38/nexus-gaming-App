import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../models/game';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.cartItemsSubject.next(JSON.parse(storedCart));
      }
    }
  }

  get cartItemsValue(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addToCart(game: Game) {
    const currentItems = this.cartItemsValue;
    const existingItem = currentItems.find(item => item.gameId === game.id);

    let updatedItems;
    if (existingItem) {
      updatedItems = currentItems.map(item =>
        item.gameId === game.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedItems = [...currentItems, { gameId: game.id, quantity: 1, priceAtAddition: game.price }];
    }

    this.updateCart(updatedItems);
  }

  removeFromCart(gameId: string) {
    const updatedItems = this.cartItemsValue.filter(item => item.gameId !== gameId);
    this.updateCart(updatedItems);
  }

  updateQuantity(gameId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(gameId);
      return;
    }

    const updatedItems = this.cartItemsValue.map(item =>
      item.gameId === gameId ? { ...item, quantity } : item
    );
    this.updateCart(updatedItems);
  }

  clearCart() {
    this.updateCart([]);
  }

  private updateCart(items: CartItem[]) {
    this.cartItemsSubject.next(items);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }

  getTotal(games: Game[]): number {
    return this.cartItemsValue.reduce((total, item) => {
      const game = games.find(g => g.id === item.gameId);
      return total + (game ? game.price * item.quantity : 0);
    }, 0);
  }

  getItemCount(): number {
    return this.cartItemsValue.reduce((count, item) => count + item.quantity, 0);
  }
}
