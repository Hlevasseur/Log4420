var express = require("express");
var router = express.Router();
var ShoppingCart = require('../model/shopping-cart');

router.route('/')
  .get(function(request, response) {
    var shoppingCart = new ShoppingCart();
    shoppingCart.getCartFromSession(request.session)
    response.json(shoppingCart.toJSON());
  })
  .post(function(request, response) {
    var id = request.body.id;
    var qty = request.body.quantity;
    var shoppingCart = new ShoppingCart();
    shoppingCart.getCartFromSession(request.session)
      .addProduct(id, qty, function(errorCode, updatedCart){
        if(errorCode) {
          response.sendStatus(400);
          return;
        }
        updatedCart.saveToSession(request.session);
        response.sendStatus(201);
      });
  })
  .delete(function(request, response) {
    var shoppingCart = new ShoppingCart();
    shoppingCart.getCartFromSession(request.session)
      .deleteCart()
      .saveToSession(request.session);
    console.log(shoppingCart);
    console.log(request.session.shoppingCart);
    response.sendStatus(204);
  });

router.route('/:id')
  .get(function(request, response){

  })
  .post(function(request, response) {

  })
  .put(function(request, response) {

  })
  .delete(function(request, response) {

  });




module.exports = router;
