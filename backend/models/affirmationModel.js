const mongoose = require( 'mongoose' )

const affirmationSchema = mongoose.Schema(
  {
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
      required: false,
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
)

affirmationSchema.set( 'toJSON', {
  transform: ( doc, o, options ) => {
    o.id = o._id
    delete o._id
    delete o.__v
  },
} )

module.exports = mongoose.model( 'Affirmation', affirmationSchema )
