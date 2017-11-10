var Product = require('./product');

var ShoppingCart = module.exports = function(session) {
  this.products = new Array();
  if(session) { this.getCartFromSession(session); }
};


ShoppingCart.prototype.getProduct = function (idStr, callback) {
  var id = parseInt(idStr);
  if(!id) {
    return null;
  }
  // Check if product exists
  var product;
  this.products.forEach(function(p) {
    if(p.productId === id) {
      product = p;
    }
  });
  return product;
};

ShoppingCart.prototype.addProduct = function(idStr, qty, callback) {
  // var checking
  // No need to check id, getProduct will do it
  var quantity = parseInt(qty);
  if(!quantity || quantity <= 0) {
    callback(400);
    return;
  }

  var id = parseInt(idStr);

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

ShoppingCart.prototype.updateProduct = function (idStr, qty, callback) {
  // var checking
  var quantity = parseInt(qty);
  
  if(!quantity || quantity <= 0) { return callback(400); }

  var id = parseInt(idStr);

  var product;
  this.products.forEach(function(p) {
    if(p.productId === id) {
      product = p;
      p.quantity = quantity;
    }
  });
  if(!product) { return callback(404); }
  callback(null, this);
};

ShoppingCart.prototype.deleteProduct = function (idStr, callback) {
  var id = parseInt(idStr);

  // Check if product exists
  var inCart = false
  this.products.forEach(function(p) {
    if(p.productId === id) { inCart = true; }
  });

  // Check if id already in cart
  if(!inCart) {
    callback(404);
  }
  // Product exists, can proceed
  var prod = new Array();
  this.products.forEach(function(p) {
    if(p.productId !== id) { prod.push(p); }
  });
  this.products = prod;
  callback(null, this);
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
