const {model, Schema} = require('mongoose');

// Define MongoDB Schema for data
const testSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

module.exports = model('test', testSchema);
