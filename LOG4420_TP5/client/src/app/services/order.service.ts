import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../config';

/**
 * Defines an order.
 */
export class Order  {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  products: string;
  features: [{
	  quantity: number,
	  id: number
  }];
}

/**
 * Defines the service responsible to retrieve the orders in the database.
 */
@Injectable()
export class OrderService {

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
   * Initializes a new instance of the OrderService class.
   *
   * @param http                    The HTTP service to use.
   */
  constructor(private http: Http) { }

  /**
   * Gets the order associated with the order ID specified.
   *
   * @param orderId               The order ID associated with the order to retrieve.
   * @returns {Promise<Order>}    A promise that contains the order associated with the ID specified.
   */
  getOrder(orderId: number): Promise<Order> {
    const url = `${Config.apiUrl}/orders/${orderId}`;
    return this.http.get(url)
      .toPromise()
      .then(order => order.json() as Order)
      .catch(() => null);
  }
  
    /**
   * Post the order given into the database.
   *
   * @param order               The order to post into the database.
   * @returns {Promise<number>}    A promise that contains the status code returned by the server.
   */
  pushOrder(order: Order): Promise<number> {
    const url = `${Config.apiUrl}/orders`;
	
    return this.http.post(url,order)
	  .toPromise()
	  .then(response => response.status)
      .catch(() => null);
  }
}
