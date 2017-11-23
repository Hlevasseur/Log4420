'use strict';

var PRODUCTS = (function() {
  let endpoint = '/api/products/';
  var self = {};

  self.getProduct = function(id, callback) {
    $.ajax({
      url: endpoint+id,
      type: 'GET',
      success: function(product) {
        callback(product);
      },
      error: function() {
        callback(null);
      }
    });
  }

  self.getProducts = function(category, criteria, success) {
    var params = {criteria: criteria, category: category};
    $.getJSON(endpoint, params, success);
  }

  return self;
})();
