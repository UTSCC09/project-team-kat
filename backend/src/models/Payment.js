const {model, Schema} = require('mongoose');

const paymentSchema = new Schema({
  client_secret: {
    type: String,
    required: true,
  },
},
{timestamps: true},
);

module.exports = model('Payment', paymentSchema);