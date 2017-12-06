import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Order, OrderService} from '../services/order.service';
import {ShoppingCartProduct,  ShoppingCartService} from '../services/shopping-cart.service';

declare const $: any;

/**
 * Defines the component responsible to manage the order page.
 */
@Component({
  selector: 'order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: any;
  order: Order;
  idmax = 100000;
  
  constructor(
    private router:Router,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService
    ) { }

  /**
   * Occurs when the component is initialized.
   */
  ngOnInit() {
    // Initializes the validation of the form. This is the ONLY place where jQuery usage is allowed.
    this.orderForm = $('#order-form');
    $.validator.addMethod('ccexp', function(value) {
      if (!value) {
        return false;
      }
      const regEx = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-9][0-9])$/g;
      return regEx.test(value);
    }, 'La date d\'expiration de votre carte de crédit est invalide.');
    this.orderForm.validate({
      rules: {
        'phone': {
          required: true,
          phoneUS: true
        },
        'credit-card': {
          required: true,
          creditcard: true
        },
        'credit-card-expiry': {
          ccexp: true
        }
      }
    });
  }

  /**
   * Submits the order form.
   */
  submit() {

    if (!this.orderForm.valid()) {
      return;
    }else{
      this.orderService.getNumberOrders().then(idMax => {//Récupération du dernier id
        if(idMax){
          this.order = new Order();
          this.shoppingCartService.getShoppingCart()
            .then(shoppingCartProducts => {
              this.order.id = idMax+1;
              this.order.firstName = this.orderForm.find('#first-name').val();
              this.order.lastName = this.orderForm.find('#last-name').val();
              this.order.email = this.orderForm.find('#email').val();
              this.order.phone = this.orderForm.find('#phone').val();
              for(let i = 0; i<shoppingCartProducts.length;i++){
                this.order.products.push({quantity:shoppingCartProducts[i].quantity,id:shoppingCartProducts[i].productId});
              }
              this.orderService.pushOrder(this.order).then(number =>{
                if(number==201){  // La commande a été enregistrée
                  this.shoppingCartService.deleteCart();
                  this.router.navigate(["/confirmation"],{queryParams:{id: this.order.id, firstName: this.order.firstName,lastName: this.order.lastName}});
                }});
            });
        }
      })
    }
    
  }
}
