var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Order = module.exports = mongoose.model("Order", new Schema({
  id: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  products: Array
}, { versionKey: false }));


// Get order by id
module.exports.getOrder = function(id, callback) {
  id = parseInt(id);
  if(!id) {
    callback(404);
    return;
  }
  Order.findOne({ id: id }, function(error, order) {
    if(error) {
      callback(404);
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

module.exports.createOrder = function(param, callback) {
  var id = parseInt(param.id);
  var firstName = param.firstName;
  var lastName = param.lastName;
  var email = param.email;
  var phone = param.phone;
  var products = param.products;

    // Check if all params are given
  console.log(id);  console.log(firstName);
  console.log(lastName);
  console.log(email);
  console.log(phone);
  console.log(products);

  if(!id || !firstName || !lastName || !email || !phone || !products) {
    console.log("not all given");
    callback(400);
    return;
  }
  // Check if param are valid
  else if (!isEmail(email) || !isPhone(phone) || typeof firstName !== 'string' || typeof lastName !== 'string' || !isAProductArray(products)) {
    console.log("not valid");
    console.log(!isEmail(email));
    console.log(!isPhone(phone) );
    console.log(!isAProductArray(products));

    callback(400);
    return;
  }

  // Everything is fine, look for order with same id
  Order.getOrder(id, function(err, order){
    if(err) {
      throw err;
    }
    if(order) {
      callback(400);
      return;
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
  
}

// --------------- Private functions ----------------

// Check is the array is composed of id and quantity 
function isAProductArray(array) {
  for(i=0; i <i.length; i++) {
    if(!array[i] || !parseInt(array[i].id) || !parseInt(array[i].quantity)) {
      return false;
    }
  }
  return array.length > 0;
}
       
// Check if the email is correct
function isEmail(string){
  var patt = new RegExp("^[a-zA-Z_.0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$");
  return patt.exec(string);   
};
    
// Check if the phone is correct
function isPhone(string){
  var patt = new RegExp("^([2-9])([1-9]){2}\-([0-9]){3}\-([0-9]){4}$");
  return patt.exec(string);   
};