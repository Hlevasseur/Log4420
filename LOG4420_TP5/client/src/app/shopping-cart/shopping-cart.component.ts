import { Component, OnInit } from '@angular/core';
import { DisplayedCartProduct, ShoppingCartService} from '../services/shopping-cart.service';

/**
 * Defines the component responsible to manage the shopping cart page.
 */
@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  products: DisplayedCartProduct[] = [];
  sum: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.fetchAndDisplayCart();
  }

  fetchAndDisplayCart(): void {
    this.shoppingCartService.getDisplayedItems()
      .then(items => {
        this.products = items;
        this.updateSum();
      });
  }

  updateSum(): void {
    this.products.forEach(p => this.sum = this.sum + p.price*p.quantity );
  }

}
