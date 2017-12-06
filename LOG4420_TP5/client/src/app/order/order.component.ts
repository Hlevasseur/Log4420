import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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
        'credit_card': {
          required: true,
          creditcard: true
        },
        'credit_card_expiry': {
          ccexp: true
        }
      }
    });
  }

  /**
   * Submits the order form.
   */
  submit(form: NgForm) {
    if (!this.orderForm.valid()) {
      return;
    } else {
      this.orderService.getNumberOrders()
        .then(idMax => {//Récupération du dernier id
          if(!idMax){
  	       idMax=0;
          }
          this.order = new Order();
          this.shoppingCartService.getShoppingCart()
            .then(shoppingCartProducts => {
              this.order.id = idMax+1;
              this.order.firstName = form.value.first_name;
              this.order.lastName = form.value.last_name;
              this.order.email = form.value.email;
              this.order.phone = form.value.phone;
              for(let i = 0; i<shoppingCartProducts.length;i++){
                this.order.products.push({quantity:shoppingCartProducts[i].quantity,id:shoppingCartProducts[i].productId});
              }
              this.orderService.pushOrder(this.order).then(number =>{
                if(number==201){  // La commande a été enregistrée
                  this.shoppingCartService.deleteCart();
                  this.router.navigate(["/confirmation"],{queryParams:{id: this.order.id, firstName: this.order.firstName,lastName: this.order.lastName}});
                }});
              });
      })
    }

  }
}
