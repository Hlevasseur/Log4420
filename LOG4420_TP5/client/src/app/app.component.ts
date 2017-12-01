import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './services/shopping-cart.service';

/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  readonly authors = [
    'François Beiger',
    'Hubert Levasseur'
  ];

  shCount: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  /**
   * On Init
   */
  ngOnInit() {
    this.shoppingCartService.updateCount.subscribe(() => {
      this.getCount();
    });
  }

  getCount(): void {
    this.shoppingCartService.getCount().then(count => this.shCount = count);
  }
}
