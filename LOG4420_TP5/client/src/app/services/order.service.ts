import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
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
  products: {
	  quantity: number,
	  id: number
  }[] = [];
}

/**
 * Defines the service responsible to retrieve the orders in the database.
 */
@Injectable()
export class OrderService {
  
  private baseUrl = `${Config.apiUrl}/orders/`;
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
    const body = JSON.stringify(order);
    
    return this.http.post(this.baseUrl, body, this.options)
    .toPromise()
    .then(response => response.status)
    .catch(OrderService.handleError)
  }
}
