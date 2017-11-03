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
