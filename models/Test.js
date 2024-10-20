
// models/Test.js

const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  logo: String,
  name:String,
  longDescription:String,
  cityPresent: String,
});

module.exports = mongoose.model('Test', testSchema);

