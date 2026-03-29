import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MockApiService } from '../../services/mock-api.service';
import { Game } from '../../models/game';
import { CartItem } from '../../models/cart-item';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: (CartItem & { game?: Game })[] = [];
  total = 0;
  loading = true;

  constructor(
    private cartService: CartService,
    private api: MockApiService
  ) {}

  ngOnInit() {
    combineLatest([
      this.cartService.cartItems$,
      this.api.getGames()
    ]).pipe(
      map(([items, games]) => {
        return items.map(item => ({
          ...item,
          game: games.find(g => g.id === item.gameId)
        }));
      })
    ).subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
      this.loading = false;
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => {
      return acc + (item.game ? item.game.price * item.quantity : 0);
    }, 0);
  }

  updateQuantity(gameId: string, delta: number) {
    const item = this.cartItems.find(i => i.gameId === gameId);
    if (item) {
      this.cartService.updateQuantity(gameId, item.quantity + delta);
    }
  }

  removeItem(gameId: string) {
    this.cartService.removeFromCart(gameId);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
