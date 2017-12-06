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
    this.sum = 0;
    this.products.forEach(p => this.sum = this.sum + p.price*p.quantity );
  }

  updateProductQuantity(productId: number, quantity: number): void {
    const self = this;
    const prevQty = this.products.filter(p => p.productId == productId ? p : null)[0].quantity;
    const newQty = prevQty + quantity;
    this.shoppingCartService.updateProductQuantity(productId, newQty)
      .then(() => {
        const p = self.products.filter(p => p.productId == productId ? p : null)[0];
        p.quantity += quantity;
        self.updateSum();
      });
  }

  deleteProduct(productId: number): void {
    if(confirm("Voulez-vous supprimerle produit du panier ?")) {
      const self = this;
      this.shoppingCartService.deleteProduct(productId)
        .then(() => {
          self.products = self.products.filter(p => p.productId != productId ? p : null);
          self.updateSum();
        });
    }
  }

  flushCart(): void {
    if(confirm("Voulez-vous supprimer tous les produits du panier ?")) {
      const self = this;
      this.shoppingCartService.deleteCart()
        .then(()=> {
          self.products = [];
          self.updateSum();
        });
    }
  }

}
