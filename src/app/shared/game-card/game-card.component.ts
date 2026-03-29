import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Game } from '../../models/game';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  @Input() game!: Game;

  constructor(private cartService: CartService) {}

  addToCart(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.cartService.addToCart(this.game);
  }

  toggleWishlist(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    console.log('Toggled wishlist:', this.game.id);
  }
}
