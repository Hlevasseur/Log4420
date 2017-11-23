'use strict';

var CART = (function(){
  let endpoint = '/api/shopping-cart/';
  let prodEndpoint = 'api/products/ids';
  var self = {};

  // Private methods
  function getProductFromCart(id, callback) {
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

  // Public Methods

  self.getCartProducts = function(success) {
    $.getJSON(endpoint, success);
  }

  self.getCart = function(success) {
    self.getCartProducts(function(cart) {
      let ids = cart.map(function(product){ return product.productId; });
      if(ids.length == 0) { success([]); }
      else {
        let body = {"ids": ids};
        $.ajax({url: prodEndpoint, data: JSON.stringify(body), type: 'POST', contentType: 'application/json'}).done(function(products) {
          let cartItems = products.map(function(p) {
            let i = ids.indexOf(p.id);
            let quantity = cart[i].quantity;
            return {
              id: p.id,
              name: p.name,
              price: p.price,
              quantity: quantity
            }
          });
          success(cartItems);
        });
      }
    });
  }

  self.flushCart=function() {
    $.ajax({
      url: endpoint,
      type: 'DELETE'
    });
  }

  self.addProductToCart = function(product, qty, callback) {
    getProductFromCart(product.id, function(productInCart) {
      if(!productInCart) {
        let body = {productId: product.id, quantity: parseInt(qty)};
        $.ajax({
          url: endpoint,
          type: 'POST',
          data: body,
          success: function() {
            callback(true);
          },
          error: function() {
            callback(false);
          }
        });
      } else {
        // Product already in cart, update qty
        self.updateProductQuantity(product.id, qty, callback);
      }
    });
  }

  self.updateProductQuantity = function(id, qty, callback) {
    getProductFromCart(id, function(product) {
      var newQty=qty;
      if(product) { newQty = parseInt(qty) + product.quantity; }
      else { callback(false); }

      let returnedProduct = {id: id, price: product.price, quantity: newQty};

      let body = {quantity: newQty};
      $.ajax({
        url: endpoint+id,
        type: 'PUT',
        data: body,
        success: function() {
          callback(returnedProduct);
        },
        error: function() {
          callback(null);
        }
      })
    });
  }

  self.getProductsCount = function(success) {
    $.getJSON(endpoint, function(cart) {
      if(cart) {
        var count = 0;
        cart.forEach(function(product) {
          count = count + product.quantity;
        });
        success(count);
      } else {
        success(0);
      }
    });
  }

  self.addOneQuantityToCart = function(id, callback) {
    self.updateProductQuantity(id, 1, callback);
  }

  self.removeOneQuantityToCart = function(id, callback){
    self.updateProductQuantity(id, -1, callback);
  }

  self.removeProductFromCart = function(id, callback) {
    $.ajax({
      url: endpoint+id,
      type: 'DELETE',
      success: function() {
        callback(true);
      },
      error: function() {
        callback(false);
      }
    })
  }

  return self;
})();
