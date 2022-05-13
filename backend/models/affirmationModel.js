const mongoose = require('mongoose');

const affirmationSchema = mongoose.Schema(
  {
    mood: {
      type: String,
      required: [true, 'Please add a mood'],
    },
    affirmation: {
      type: String,
      required: [true, 'Please add a affirmation'],
    },
    node: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Affirmation', affirmationSchema);
