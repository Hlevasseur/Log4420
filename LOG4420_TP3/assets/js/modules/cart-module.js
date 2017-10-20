'use strict';

var CART = (function(){
  var self = {};

  function newCart() {
     return {
       products: []
     };
  }

  function getProductFromCart(cart, id) {
    return cart.products.filterProductById(id);
  }

  self.saveCart = function(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  self.getCart = function() {
    var cart = localStorage.getItem("cart");
    return cart && JSON.parse(cart);
  }

  self.addProductToCart = function(product, qty) {
    var cart = self.getCart();
    if(!cart) {
      cart = newCart()
    }
    if(!getProductFromCart(cart, product.id)) {
      let dataProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: qty.toString()
      }
      cart.products.push(dataProduct);
    } else {
      // Product already in cart, update qty
      let dataProduct = getProductFromCart(cart, product.id);
      let count = parseInt(dataProduct.quantity) + parseInt(qty);
      dataProduct.quantity = count.toString();
    }
    self.saveCart(cart);
  }

  return self;
})();
