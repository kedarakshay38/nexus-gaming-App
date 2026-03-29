import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGridComponent } from '../../shared/product-grid/product-grid.component';
import { MockApiService } from '../../services/mock-api.service';
import { Game } from '../../models/game';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductGridComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredGames: Game[] = [];
  loading = true;

  constructor(private api: MockApiService) {}

  ngOnInit() {
    this.api.getGames().subscribe(games => {
      this.featuredGames = games.slice(0, 4); // Show top 4 as featured
      this.loading = false;
    });
  }
}
