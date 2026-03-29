import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MockApiService } from '../../services/mock-api.service';
import { CartService } from '../../services/cart.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
  game: Game | undefined;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private api: MockApiService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getGameById(id).subscribe(result => {
        this.game = result;
        this.loading = false;
      });
    }
  }

  addToCart() {
    if (this.game) {
      this.cartService.addToCart(this.game);
    }
  }
}
