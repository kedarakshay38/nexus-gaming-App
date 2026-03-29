import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../game-card/game-card.component';
import { Game } from '../../models/game';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent {
  @Input() games: Game[] = [];
  @Input() loading: boolean = false;
}
