import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsService } from '../services/products.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

/**
 * Defines the component responsible to manage the product page.
 */
@Component({
  selector: 'product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  product: Product;
  productId: number;
  notification: boolean = false;

  /**
   * Initializes a new instance of the ProductComponent class.
   *
   * @param route                   The active route.
   */
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService
  ) { }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    const self = this;
    this.productId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(this.productId)
      .then(product => {
        self.product = product;
      });
  }

  addProductToCart(input): void {
    const quantity: number = parseInt(input.value);
    const self = this;
    this.shoppingCartService.getShoppingCart()
      .then(products => {
        var promise: Promise<Object>;
        if(products.map(p => p.productId).includes(this.productId)) {
          const prevQty = products.filter(p => p.productId == this.productId ? p : null)[0].quantity;
          const newQty = prevQty + quantity;
          promise = this.shoppingCartService.updateProductQuantity(this.productId, newQty);
        } else {
          promise = this.shoppingCartService.addProductToCart(this.productId, quantity)
        }
        return promise;
      }).then(() => {
        self.displayNotification();
      });
  }



  displayNotification(): void {
    this.notification = true;
    setTimeout(5000, () => this.notification = false);
  }

}
