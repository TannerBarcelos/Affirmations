const express = require( 'express' )
const errorHandler = require( './middlewares/errorMiddleware' )
const connectDB = require( './config/connectDB' )
const cors = require( 'cors' )
const apiRoutes = require( './routes' )
require( 'dotenv' ).config()

connectDB()

const app = express()

const PORT = process.env.PORT || 4000

app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )

app.use( "/backend", apiRoutes )

app.use( errorHandler )

app.listen( PORT, console.log( `Server listening on port ${PORT}` ) )
