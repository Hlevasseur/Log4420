'use strict';

var PRODUCTS = (function() {
  var self = {};

  self.getProduct = function(id, success) {
    $.getJSON('/api/products/'+id, success);
  }

  self.getProducts = function(category, criteria, success) {
    var params = {criteria: criteria, category: category};
    $.getJSON('/api/products', params, success);
  }

  return self;
})();
