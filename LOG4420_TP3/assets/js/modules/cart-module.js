'use strict';

var CART = (function(){
  var self = {};

  self.saveCart = function(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  self.getCart = function() {
    var cart = localStorage.getItem("cart");
    return cart && JSON.parse(cart);
  }

  return self;
})();
