import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

/**
 * Defines the component responsible to manage the display of the products page.
 */
@Component({
  selector: 'products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.getCount().then();
  }
}
