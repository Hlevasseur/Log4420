var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./product');

var Order = module.exports = mongoose.model("Order", new Schema({
  id: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  products: Array
}, { versionKey: false }));


// Get order by id
module.exports.getOrder = function(idStr, callback) {
  var id = parseInt(idStr);
  if(!id) {
    callback(404);
    return;
  }
  Order.findOne({ id: id }, function(error, order) {
    if(error || !order) {
      callback(404);
      return;
    }
    callback(null, order);
  });
}

// Get all orders
module.exports.getOrders = function(callback) {

  Order.find(function(error,orders){
    if(error){
      throw error;
    }
    callback(null,orders)
  });
}

module.exports.removeAllOrder = function(callback){
  Order.remove({}, function(error){
    if(error){
      throw error;
    }
    callback(204);
  });
}

module.exports.removeOrder = function(idStr, callback){
  var id = parseInt(idStr);
  if(!id){
    callback(404);
    return;
  }
  Order.getOrder(id,function(errorCode,order){
    if(errorCode){
      return callback(errorCode);
    }
    // if it does not exist
    if(!order){
      callback(404);
      return;
    }
    order.remove(function(error){
      if(error){
        throw error;
      }
      callback(204);
    });
  });
}
module.exports.createOrder = function(param, callback) {
  var id = parseInt(param.id);
  var firstName = param.firstName;
  var lastName = param.lastName;
  var email = param.email;
  var phone = param.phone;
  var products = param.products;

    // Check if all params are given
  if(!id || !firstName || !lastName || !email || !phone || !products) {
    callback(400);
    return;
  }


   if (!isEmail(email) || !isPhone(phone) || typeof firstName !== 'string' || typeof lastName !== 'string') {
    callback(400);
    return;
  }

  isAProductArray(products, function(success){
    if(!success) {
      callback(400);
      return;
    }
    // Everything is fine, look for order with same id
    Order.getOrder(id, function(errCode, order){
      if(errCode && errCode != 404) {
        return callback(errCode);
      }
      if(order) {
        return callback(400);
      }
      // No product found, we can process creation
      var order = new Order({
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        products: products
      });
      order.save(function(error){
        if(error) {
          throw error;
        }
        callback(201);
      });
    });
  });
}

// --------------- Private functions ----------------

// Check is the array is composed of id and quantity
function isAProductArray(array, callback) {
  if(!array.length>0){
    callback(false);
    return;
  }
  var ids=[array.length];
  for(i=0; i <array.length; i++) {
    if(!array[i] || !parseInt(array[i].id) || !parseInt(array[i].quantity)) {
      callback(false);
      return;
    }
    ids[i]=parseInt(array[i].id);
    array[i].id = parseInt(array[i].id);
    array[i].quantity = parseInt(array[i].quantity);
  }


  Product.getProductsById(ids,function(products){

    if(array.length!=products.length){
      callback(false);
      return;
    }else{
      callback(true);
      return;
    }
  });
}

// Check if the email is correct
function isEmail(string){
  var patt = new RegExp("^[a-zA-Z_.-0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$");
  return patt.exec(string);
};

// Check if the phone is correct
function isPhone(string){
  var patt = new RegExp("^([2-9])([1-9]){2}\-([0-9]){3}\-([0-9]){4}$");
  return patt.exec(string);
};
