import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Config } from '../config';
import { Product } from './products.service';

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

  getOptions(): RequestOptions {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers, withCredentials: true });
  }

  /**
   * Gets all the products in the shopping cart.
   *
   * @return {Promise<ShoppingCartProduct[]>}   The promise containing all the shoppingcartProducts inside.
   */
  getShoppingCart(): Promise<ShoppingCartProduct[]> {
    let url = `${Config.apiUrl}/shopping-cart`;
    return this.http.get(url, this.getOptions())
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
            })
  }

}
