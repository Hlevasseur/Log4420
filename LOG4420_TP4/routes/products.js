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
  .post('/', function(request, response) {
    var params = request.body;
    Product.createProduct(params, function(statusCode) {
      response.sendStatus(statusCode);
    });
  })
  .get('/:id', function(request, response) {
    var id = request.params.id;
    Product.getProduct(id, function(errorCode, product) {
      if(error) {
        response.sendStatus(errorCode);
        return;
      }
      response.json(product);
    });    
  })
  .delete('/:id', function(request, response){
    var id = request.params.id;
    Product.removeProduct(id, function(statusCode){
      response.sendStatus(statusCode);
    });
  });


module.exports = router;
