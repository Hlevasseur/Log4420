'use strict';

var CART = (function(){
  var self = {};

  // Private methods

  function newCart() {
     return {
       products: []
     };
  }

  function getProductFromCart(cart, id) {
    return cart.products.filterProductById(id);
  }

  function saveCart(cart) {
    LOCAL_STORAGE.setObject("cart", cart);
  }

  // Public Methods

  // Singleton
  // Always use this methods to access the cart
  self.getCart = function() {
    var cart = LOCAL_STORAGE.getObject("cart");
    if(!cart) {
      cart = newCart();
    }
    return cart;
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
    saveCart(cart);
  }

  self.getProductsCount = function() {
    let cart = self.getCart();
    var count = 0;
    cart.products.forEach(function(product){
      count += parseInt(product.quantity);
    });
    return count;
  }

  return self;
})();
