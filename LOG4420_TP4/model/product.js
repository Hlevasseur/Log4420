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
  Product.findOne({ id: id }, function(error, product) {
    if(error) {
      throw error;
    }
    callback(product);
  });
}

// Get products
module.exports.getProducts = function(category, criteria, callback) {
  // Var test
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
