import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  @Input() game!: Game;

  addToCart(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    console.log('Added to cart:', this.game.id);
  }

  toggleWishlist(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    console.log('Toggled wishlist:', this.game.id);
  }
}
