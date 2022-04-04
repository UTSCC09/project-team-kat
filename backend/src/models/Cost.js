const {model, Schema} = require('mongoose');

const costSchema = new Schema({
  ownerId: {
    type: String,
    required: true,
  },
  groupId: {
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
  active: {
    type: Boolean,
    default: true,
  },
},
{timestamps: true},
);

module.exports = model('Cost', costSchema);
