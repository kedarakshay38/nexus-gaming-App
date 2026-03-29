import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { MockApiService } from '../../services/mock-api.service';
import { Game } from '../../models/game';
import { ProductGridComponent } from '../../shared/product-grid/product-grid.component';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductGridComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlistGames: Game[] = [];
  loading = true;

  constructor(
    private wishlistService: WishlistService,
    private api: MockApiService
  ) {}

  ngOnInit() {
    combineLatest([
      this.wishlistService.wishlistIds$,
      this.api.getGames()
    ]).pipe(
      map(([ids, games]) => {
        return games.filter(g => ids.includes(g.id));
      })
    ).subscribe(games => {
      this.wishlistGames = games;
      this.loading = false;
    });
  }
}
