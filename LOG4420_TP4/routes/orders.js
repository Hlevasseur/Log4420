var express = require("express");
var router = express.Router();
var Order = require('../model/order');

router
  .get('/', function(request, response) {
    Order.getOrders(function(errorCode,orders) {
      if(errorCode) {
        response.sendStatus(errorCode);
        return;
      }
      response.json(orders);
    });
  })
  .get('/:id', function(request, response) {
    var id = request.params.id;
    Order.getOrder(id, function(errorCode, order) {
      if(error) {
        response.sendStatus(errorCode);
        return;
      }
      response.json(order);
    });    
  })
  .post('/', function(request, response) {
    var params = request.body;
    Order.createOrder(params, function(statusCode) {
      response.sendStatus(statusCode);
    });
  })


module.exports = router;
