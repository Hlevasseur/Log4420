import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Config } from '../config';
import { Product, ProductsService } from './products.service';

/**
 * Defines a ShoppingCart Product
 *
 */
class ShoppingCartProduct {
  productId: string;
  quantity: number;
}

/**
 * Defines the service responsible to retrieve the shoppingcart in the database.
 */
@Injectable()
export class ShoppingCartService {

  @Output() countUpdated: EventEmitter<number> = new EventEmitter();
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
   * Gets all the products in the shopping cart.
   *
   * @return {Promise<number>}   The promise containing the number of items.
   */
  getCount(): Promise<number> {
    let self = this;
    return this.getShoppingCart()
      .then(function(shoppingCartProducts) {
        var count: number = 0;
        shoppingCartProducts.forEach(function(shProduct) {
          count = count + shProduct.quantity;
        });
        self.countUpdated.emit(count);
        return count;
      });
  }


  /**
   * Add a product to the cart.
   *
   * @param productId             The id of the product
   * @param quantity              The quantity of the product
   *
   * @return {Promise<number>}    The Promise containing the response status
   */
  addProductToCart(productId, quantity): Promise<number> {
    const body = {
      productId: productId,
      quantity: quantity
    }
    return this.http.post(this.baseUrl, body, this.options)
      .toPromise()
      .then(response => response.status);
  }


  /**
   * Update the quantity of a product in cart.
   *
   * @param productId           The id of the product
   * @param newQuantity         The new quantity of the product
   *
   * @return {Promise<number>}  The promise containing the response status
   *
   */
  updateProductQuantity(productId, newQuantity): Promise<number> {
    const url = this.baseUrl + productId;
    const body = { quantity: newQuantity };
    return this.http.put(url, body, this.options)
      .toPromise()
      .then(response => response.status);
  }


  /**
   * Delete a product in cart.
   *
   * @param productId           The id of the product
   *
   * @return {Promise<number>}  The Promise containing the response status
   *
   */
  deleteProduct(productId): Promise<number> {
    const url = this.baseUrl + productId;
    return this.http.delete(url, this.options)
      .toPromise()
      .then(response => response.status);
  }


  /**
   * Delete the cart
   *
   * @return {Promise<number>}  The Promise containing the response status
   */
  deleteCart(): Promise<number> {
    return this.http.delete(this.baseUrl, this.options)
      .toPromise()
      .then(response => response.status);
  }

}
