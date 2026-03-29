import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductGridComponent } from '../../shared/product-grid/product-grid.component';
import { MockApiService } from '../../services/mock-api.service';
import { Game } from '../../models/game';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, ProductGridComponent, FormsModule],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  loading = true;

  searchTerm = '';
  selectedGenre = '';
  selectedSort = '';

  genres = ['Action', 'RPG', 'FPS', 'Cyberpunk', 'Strategy', 'Adventure'];

  private searchSubject = new Subject<string>();

  constructor(private api: MockApiService) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.loadGames();
    });
  }

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.loading = true;
    this.api.getGames(this.searchTerm, this.selectedGenre, this.selectedSort)
      .subscribe(results => {
        this.games = results;
        this.loading = false;
      });
  }

  onSearchChange() {
    this.searchSubject.next(this.searchTerm);
  }

  onFilterChange() {
    this.loadGames();
  }
}
