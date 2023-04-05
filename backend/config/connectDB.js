const mongoose = require( 'mongoose' )

const connectDB = async () => {
  try {
    const connection = await mongoose.connect( process.env.MONGO_URI )
    console.log( `MongoDB Connected to ${connection.connection.host}` )
  } catch ( error ) {
    console.error( error )
    process.exit( 1 )
  }
}

module.exports = connectDB
