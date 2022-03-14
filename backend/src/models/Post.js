const {model, Schema} = require('mongoose');

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
    unique: false,
  },
  author: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  fabricObject: {
    type: String,
    required: true,
  },
},
{timestamps: true},
);

module.exports = model('Post', postSchema);
