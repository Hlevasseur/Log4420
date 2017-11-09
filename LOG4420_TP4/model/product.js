var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('../lib/utils');

var categoriesAllowed = ["", "cameras", "computers", "consoles", "screens"];
var criteriasAllowed = ["", "alpha-asc", "alpha-dsc", "price-asc", "price-dsc"];

var Product = module.exports = mongoose.model("Product", new Schema({
  id: { type: Number, unique: true },
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
  features: Array
}, { versionKey: false }));

// Get product by id
module.exports.getProduct = function(id, callback) {
  id = parseInt(id);
  if(!id) {
    callback(400);
    return;
  }
  Product.findOne({ id: id }, function(error, product) {
    if(error) {
      throw error;
    }
    callback(null, product);
  });
}

// Get products
module.exports.getProducts = function(category, criteria, callback) {
  // Var test
  if(!criteria) { criteria = ""; }
  if(!category) { category = ""; }
  if(!categoriesAllowed.includes(category) || !criteriasAllowed.includes(criteria)) {
    callback(400);
    return;
  }
  var query;
  if(!category) {
    // Find all products
    query = Product.find();
  } else {
    // Find category products
    query = Product.find({ category: category});
  }
  query.exec(function(error, products) {
    if(error){
      throw error;
    }

    if(!criteria){
      criteria="price-asc";
    }

    // Sort products
    var crit = getCriteriaFromQuery(criteria);
    var prod = products.sortProductsBy(crit.label, crit.asc);

    callback(null, prod);
  });
}

module.exports.createProduct = function(param, callback) {
  var id = parseInt(param.id);
  var name = param.name;
  var price = parseFloat(param.price);
  var image = param.image;
  var category = param.category;
  var description = param.description;
  var features = param.features;
  // Check if all params are given
  if(!id || !name || !price || !image || !category  || !description || !features || !features.length > 0) {
    callback(400);
    return;
  }
  // Check if param are valid
  else if (price <= 0 || typeof name !== 'string' || typeof image !== 'string' || !categoriesAllowed.includes(category) || typeof description !== 'string' || !isAStringArray(features)) {
    callback(400);
    return;
  }

  // Everything is fine, look for product with same id
  Product.getProduct(id, function(err, product){
    if(err) {
      throw err;
    }
    if(product) {
      callback(400);
      return;
    }
    // No product found, we can process creation
    var product = new Product({
      id: id,
      name: name,
      price: price,
      image: image,
      category: category,
      description: description,
      features: features
    });
    product.save(function(error){
      if(error) {
        throw error;
      }
      callback(201);
    });
  });
}

// Remove product by id
module.exports.removeProduct = function(id, callback){
  id = parseInt(id);

  //if the id is not a int
  if(!id) {
    callback(404);
    return;
  }
  // find the product
  Product.getProduct(id , function(error,product){
    if(error){
      throw error;
    }
    // if it does not exist
    if(!product){
      callback(404);
      return;
    }
    // if it exists, we remove it
    product.remove(function(error){
      if(error){
        throw error;
      }
      callback(204);
    });
  });
}

// Remove all the products of the data base
module.exports.removeAllProducts = function(callback){
  Product.remove({}, function(error){
    if(error){
      throw error;
    }
    callback(204);
  });
}

// --------------- Private functions ----------------

// Check is String array
function isAStringArray(array) {
  for(i=0; i <i.length; i++) {
    if(!array[i] || typeof array[i] !== 'string') {
      return false;
    }
  }
  return array.length > 0;
};

// Custom get criteria info from query param
function getCriteriaFromQuery(criteria) {
  var object = {};
  var criteriaArr = criteria.split('-');
  object.label = criteriaArr[0];
  object.asc = criteriaArr[1]==='asc';
  return object;
}

// Custom criteria sort :(
mongoose.Query.prototype.criteriaSort = function(criteria) {
  switch (criteria) {
    case "alpha-asc":
      this.sort({ name: 1});
      break;
    case "alpha-dsc":
      this.sort({ name: -1});
      break;
    case "price-asc":
      this.sort({ price: 1});
      break;
    case "price-dsc":
      this.sort({ price: -1});
      break;
    default:
      break;
  }
  return this;
}
