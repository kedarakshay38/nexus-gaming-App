import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { MockApiService } from '../../services/mock-api.service';
import { Game } from '../../models/game';
import { combineLatest, map, take } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  items: any[] = [];
  total = 0;
  isProcessing = false;
  isSuccess = false;
  transactionId = '';

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private api: MockApiService,
    private router: Router
  ) {}

  ngOnInit() {
    combineLatest([
      this.cartService.cartItems$,
      this.api.getGames()
    ]).pipe(
      take(1),
      map(([items, games]) => {
        return items.map(item => ({
          ...item,
          game: games.find(g => g.id === item.gameId)
        }));
      })
    ).subscribe(items => {
      this.items = items;
      this.total = this.items.reduce((acc, item) => acc + (item.game ? item.game.price * item.quantity : 0), 0);
      
      if (this.items.length === 0 && !this.isSuccess) {
        this.router.navigate(['/cart']);
      }
    });
  }

  confirmPurchase() {
    this.isProcessing = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isProcessing = false;
      this.isSuccess = true;
      this.transactionId = (Math.random() * 1000000000).toFixed(0);
      this.cartService.clearCart();
    }, 2000);
  }
}
