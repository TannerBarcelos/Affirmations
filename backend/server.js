const express = require( 'express' )
const errorHandler = require( './middlewares/errorMiddleware' )
const connectDB = require( './config/connectDB' )
const cors = require( 'cors' )
require( 'dotenv' ).config()

connectDB()

const app = express()

const PORT = process.env.PORT || 4000
const VERSION = process.env.VERSION

app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )

app.use( `/api/${VERSION}/affirmations`, require( './routes/affirmationRoutes' ) )
app.use( `/api/${VERSION}/users`, require( './routes/userRoutes' ) )

app.use( errorHandler )

app.listen( PORT, console.log( `Server listening on port ${PORT}` ) )
