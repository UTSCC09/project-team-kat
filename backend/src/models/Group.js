const {model, Schema} = require('mongoose');

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
},
{timestamps: true},
);

module.exports = model('Group', groupSchema);
