const mongoose = require('mongoose');

const affirmationSchema = mongoose.Schema(
  {
    // A user is related to an affirmation (many) via their ID
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    startMood: {
      type: String,
      required: [true, 'Please add a starting mood'],
    },
    endMood: {
      type: String,
      required: [true, 'Please add a ending mood'],
    },
    affirmation: {
      type: String,
      required: [true, 'Please add a affirmation'],
    },
    note: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Affirmation', affirmationSchema);
