var express = require("express");
var router = express.Router();
var Product = require('../model/product');

router.route('/:id')
  .get(function(request, response) {
    var id = request.params.id;
    Product.getProduct(id, function(errorCode, product) {
      if(errorCode) {
        response.sendStatus(errorCode);
        return;
      }
      response.json(product);
    });
  })
  .delete(function(request, response){

    var id = request.params.id;
    console.log("del product "+id);
    Product.removeProduct(id, function(statusCode){
      response.sendStatus(statusCode);
    });
  });

router.route('/')
  .get(function(request, response) {
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
  .post(function(request, response) {
    var params = request.body;
    Product.createProduct(params, function(statusCode) {
      response.sendStatus(statusCode);
    });
  })
  .delete(function(request, response){
    Product.removeAllProducts(function(statusCode){
      response.sendStatus(statusCode);
    });
  });

router.route('/ids')
  .post(function(request, response) {
    var ids = request.body.ids;
    console.log(ids);
    Product.getProductsById(ids, function(errorCode, products){
      response.json(products);
    });
  })


module.exports = router;
