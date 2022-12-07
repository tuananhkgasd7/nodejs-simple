const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  name: {type: String, require: true},
  price: {type: Number},
});

module.exports = mongoose.model('Product', Product, "product");