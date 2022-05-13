const mongoose = require('mongoose');

const affirmationSchema = mongoose.Schema(
  {
    // A user is related to an affirmation (many)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
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
