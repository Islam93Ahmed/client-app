var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  phone: String
});

mongoose.model('Client', ClientSchema);