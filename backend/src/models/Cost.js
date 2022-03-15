const {model, Schema} = require('mongoose');

const costSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  groupID: {
    type: String,
    required: true,
  },
  applicableUsers: {
    type: [String],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
},
{timestamps: true},
);

module.exports = model('Cost', costSchema);
