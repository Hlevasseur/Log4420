'use strict';

var PRODUCTS = (function() {
  let endpoint = '/api/products/';
  var self = {};

  self.getProduct = function(id, success) {
    $.getJSON(endpoint+id, success);
  }

  self.getProducts = function(category, criteria, success) {
    var params = {criteria: criteria, category: category};
    $.getJSON(endpoint, params, success);
  }

  return self;
})();
