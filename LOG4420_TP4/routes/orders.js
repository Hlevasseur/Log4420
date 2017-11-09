var express = require("express");
var router = express.Router();
var Order = require('../model/order');

router.route('/')
  .get(function(request, response) {
    Order.getOrders(function(errorCode,orders) {
      if(errorCode) {
        response.sendStatus(errorCode);
        return;
      }
      response.json(orders);
    });
  })
  .post(function(request, response) {
    var params = request.body;
    Order.createOrder(params, function(statusCode) {
      response.sendStatus(statusCode);
    });
  })
  .delete(function(request, response){
    console.log("delete all ");
    Order.removeAllOrder(function(statusCode){
            response.sendStatus(statusCode);
    });
  });

router.route('/:id')
  .get(function(request, response) {
    var id = request.params.id;
    Order.getOrder(id, function(errorCode, order) {
      if(errorCode) {
        response.sendStatus(errorCode);
        return;
      }
      response.json(order);
    });
  })
  .delete(function(request,response){
    console.log("delete "+request.params.id);
    var id = request.params.id;
    Order.removeOrder(id,function(statusCode){
      response.sendStatus(statusCode);
    })
  });



module.exports = router;
