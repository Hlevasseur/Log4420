'use strict';

var PRODUCTS = (function() {
  var self = {};

  self.getProduct = function(id, callback) {
    self.getProducts(function(products) {
      let product = products.filterProductById(id);
      callback(product);
    })
  }

  self.getProducts = function(callback) {
    $.getJSON('/data/products.json', callback);
  }

  return self;
})();
