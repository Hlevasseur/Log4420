var Product = require('./product');

var ShoppingCart = module.exports = function() {
  this.products = new Array();
};


ShoppingCart.prototype.getProduct = function (id, callback) {
  if(!id) {
    callback(404);
    return;
  }
  // Check if product exists
  Product.getProduct(id, function(errorCode, product){
    if(errorCode) {
      callback(errorCode);
      return;
    }
    callback(null, product);
  });
};

ShoppingCart.prototype.addProduct = function(id, qty, callback) {
  // var checking
  // No need to check id, getProduct will do it
  var quantity = parseInt(qty);
  if(!quantity || quantity <= 0) {
    callback(400);
    return;
  }

  var alreadyInCart = false
  this.products.forEach(function(p) {
    if(p.productId === id) {
      alreadyInCart = true;
    }
  });

  // Check if id already in cart
  if(alreadyInCart) {
    callback(400);
    return;
  }

  var self = this;
  // Check if product exists
  Product.getProduct(id, function(errorCode, product){
    if(errorCode) {
      callback(errorCode);
      return;
    }
    // Product exists, can proceed
    self.products.push({productId: id, quantity: quantity});
    callback(null, self);
  });
};

ShoppingCart.prototype.updateProduct = function (id, qty) {
  // var checking
  // No need to check id, getProduct will do it
  var quantity = parseInt(qty);
  if(!quantity || quantity <= 0) {
    callback(400);
    return;
  }

  var self = this;
  // Check if product exists
  Product.getProduct(id, function(errorCode, product){
    if(errorCode) {
      callback(errorCode);
      return;
    }
    // Product exists, can proceed
    self.products.forEach(function(product) {
      if(product.id === id) { product.quantity = quantity; }
    });
    callback(null, self);
  });
};

ShoppingCart.prototype.deleteProduct = function (id, callback) {
  var self = this;
  // Check if product exists
  Product.getProduct(id, function(errorCode, product){
    if(errorCode) {
      callback(errorCode);
      return;
    }
    // Product exists, can proceed
    self.products.filter(function(product) {
      if(product.id !== id) { return product; }
    });
  });
};

ShoppingCart.prototype.deleteCart = function () {
  return new ShoppingCart();
};

ShoppingCart.prototype.getCartFromSession = function(session) {
  if(session.shoppingCart) { this.products = session.shoppingCart; }
  return this;
};

ShoppingCart.prototype.saveToSession = function(session) {
  session.shoppingCart = this.toJSON();
  return this;
};

ShoppingCart.prototype.toJSON = function() {
  return this.products;
};
