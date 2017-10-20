'use strict';

var PRODUCTS = (function() {
  var self = {};

  self.getProducts = function(callback) {
    $.getJSON('/data/products.json', callback);
  }

  self.saveCartProducts = function(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  self.getCartProducts = function() {
    var cart = localStorage.getItem("cart");
    return cart && JSON.parse(cart);
  }

  return self;
})();
