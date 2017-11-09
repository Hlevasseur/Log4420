var express = require("express");
var router = express.Router();
var Product = require('../model/product');

router
  .get('/:id', function(request, response) {
    var id = request.params.id;
    console.log(id);
    Product.getProduct(id, function(errorCode, product) {
      if(errorCode) {
        response.sendStatus(errorCode);
        return;
      }
      response.json(product);
    });    
  })
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
  .delete('/:id', function(request, response){
    
    var id = request.params.id;
    console.log("del product "+id);    
    Product.removeProduct(id, function(statusCode){
      response.sendStatus(statusCode);
    });
  })
  .delete('/', function(request, response){
    console.log("del all product");  
    Product.removeAllProducts(function(statusCode){
      response.sendStatus(statusCode);
    });
  });


module.exports = router;
