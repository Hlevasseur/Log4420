var express = require("express");
var router = express.Router();
var Product = require('../model/product');

router
  .get('/', function(request, response) {
    var category = request.query.category;
    var criteria = request.query.criteria;
    Product.getProducts(category, criteria, function(errorCode, products) {
      if(errorCode) {
        response.sendStatus(errorCode);
        return;
      }
      response.json(products);
    });
  })
  .get('/:id', function(request, response) {
    var id = request.params.id;
    if(!id) {
      response.sendStatus(400);
      return;
    }
    Product.getProduct(id, function(product){
      response.json(product);
    });
  });

module.exports = router;
