var express = require("express");
var router = express.Router();
var ShoppingCart = require('../model/shopping-cart');

router.route('/')
  .get(function(request, response) {
    var shoppingCart = new ShoppingCart(request.session);
    response.json(shoppingCart.toJSON());
  })
  .post(function(request, response) {
    var id = request.body.productId;
    var qty = request.body.quantity;
    var shoppingCart = new ShoppingCart(request.session);
    shoppingCart.addProduct(id, qty, function(errorCode, updatedCart){
        if(errorCode) {
          response.sendStatus(400);
          return;
        }
        updatedCart.saveToSession(request.session);
        response.sendStatus(201);
      });
  })
  .delete(function(request, response) {
    var shoppingCart = new ShoppingCart(request.session);
    shoppingCart.deleteCart()
      .saveToSession(request.session);
    response.sendStatus(204);
  });

router.route('/:productId')
  .get(function(request, response) {
    var id = request.params.productId;
    var shoppingCart = new ShoppingCart(request.session);
    var product = shoppingCart.getProduct(id);
    if(!product) { response.sendStatus(404); }
    else { response.json(product); }
  })
  .put(function(request, response) {
    var id = request.params.productId;
    var qty = request.body.quantity;
    var shoppingCart = new ShoppingCart(request.session);
    shoppingCart.updateProduct(id, qty, function(errorCode, updatedCart){
      if(errorCode) {
        response.sendStatus(errorCode);
        return;
      }
      updatedCart.saveToSession(request.session);
      response.sendStatus(204);
    })
  })
  .delete(function(request, response) {
    var id = request.params.productId;
    var shoppingCart = new ShoppingCart(request.session);
    shoppingCart.deleteProduct(id, function(errorCode, updatedCart){
      if(errorCode) {
        response.sendStatus(errorCode);
        return;
      }
      updatedCart.saveToSession(request.session);
      response.sendStatus(204);
    });
  });




module.exports = router;
