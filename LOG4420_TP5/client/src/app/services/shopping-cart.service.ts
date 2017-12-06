import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Config } from '../config';
import { Product, ProductsService } from './products.service';

/**
 * Defines a ShoppingCart Product
 */
export class ShoppingCartProduct {
  productId: number;
  quantity: number;
}

/**
 * Defines a DisplayedCartProduct
 */
export class DisplayedCartProduct {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

/**
 * Defines the service responsible to retrieve the shoppingcart in the database.
 */
@Injectable()
export class ShoppingCartService {

  @Output() updateCount: EventEmitter<null> = new EventEmitter();
  private baseUrl = `${Config.apiUrl}/shopping-cart/`;
  private options:RequestOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }), withCredentials: true });

  /**
   * Handles the current error.
   *
   * @param error                   The error to handle.
   * @return {Promise<object>}      A promise object.
   */
  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.feedbackMessage || error);
  }

  /**
   * Initializes a new instance of the ShoppingCartService class.
   *
   * @param http                    The HTTP service to use.
   */
  constructor(private http: Http) { }

  /**
   * Gets all the products in the shopping cart.
   *
   * @return {Promise<ShoppingCartProduct[]>}   The promise containing all the shoppingcartProducts inside.
   */
  getShoppingCart(): Promise<ShoppingCartProduct[]> {
    return this.http.get(this.baseUrl, this.options)
      .toPromise()
      .then(shoppingcartProducts => shoppingcartProducts.json() as ShoppingCartProduct[])
      .catch(ShoppingCartService.handleError);
  }

  /**
   * Get Displayed Products (i.e. containing price id, ) from Cart
   */
  getDisplayedItems(): Promise<DisplayedCartProduct[]> {
    const productService = new ProductsService(this.http);
    var displayedProducts: DisplayedCartProduct[] = [];
    return this.getShoppingCart()
      .then(shProducts => {
        displayedProducts = shProducts as DisplayedCartProduct[];
        return productService.getProducts();
      })
      .then(response => {
        let ids = displayedProducts.map(p => p.productId);
        var products = response.filter(p => ids.includes(p.id) ? p : null);
        // Sorting by id for convenience
        products.sort((p1, p2) => p1.id - p2.id);
        displayedProducts.sort((p1, p2) => p1.productId - p2.productId);
        displayedProducts.forEach(function(p, index) {
          p.price = products[index].price;
          p.name = products[index].name;
        });
        // Need to sort by name
        displayedProducts.sort((p1, p2) => p1.name.toLowerCase() < p2.name.toLowerCase() ? -1 : 1);
        return displayedProducts;
      });
  }

  /**
   * Gets all the products in the shopping cart.
   *
   * @return {Promise<number>}   The promise containing the number of items.
   */
  getCount(): Promise<number> {
    const self = this;
    return this.getShoppingCart()
      .then(function(shoppingCartProducts) {
        var count: number = 0;
        shoppingCartProducts.forEach(function(shProduct) {
          count = count + shProduct.quantity;
        });
        return count;
      }).catch(ShoppingCartService.handleError);
  }


  /**
   * Add a product to the cart.
   *
   * @param productId             The id of the product
   * @param quantity              The quantity of the product
   *
   * @return {Promise<>}    The Promise containing the response status
   */
  addProductToCart(productId:number, quantity:number): Promise<null> {
    const body = JSON.stringify({
      productId: productId,
      quantity: quantity
    });
    let self = this;
    return this.http.post(this.baseUrl, body, this.options)
      .toPromise()
      .then(() => {
        self.updateCount.emit();
      }).catch(ShoppingCartService.handleError)
  }


  /**
   * Update the quantity of a product in cart.
   *
   * @param productId           The id of the product
   * @param newQuantity         The new quantity of the product
   *
   * @return {Promise<>}  The promise containing the response status
   *
   */
  updateProductQuantity(productId: number, newQuantity: number): Promise<null> {
    const url = this.baseUrl + productId;
    const body = JSON.stringify({ quantity: newQuantity });
    const self = this;
    return this.http.put(url, body, this.options)
      .toPromise()
      .then(() => {
        self.updateCount.emit();
      }).catch(ShoppingCartService.handleError);
  }


  /**
   * Delete a product in cart.
   *
   * @param productId           The id of the product
   *
   * @return {Promise<>}        The Promise containing the response status
   *
   */
  deleteProduct(productId: number): Promise<null> {
    const url = this.baseUrl + productId;
    const self = this;
    return this.http.delete(url, this.options)
      .toPromise()
      .then(response => {
        self.updateCount.emit();
      }).catch(ShoppingCartService.handleError);
  }


  /**
   * Delete the cart
   *
   * @return {Promise<null>}  The Promise containing the response status
   */
  deleteCart(): Promise<null> {
    const self = this;
    return this.http.delete(this.baseUrl, this.options)
      .toPromise()
      .then(response => {
        self.updateCount.emit();
      }).catch(ShoppingCartService.handleError);
  }

}
