const express = require('express')
const errorHandler = require('./middlewares/errorMiddleware')
const connectDB = require('./config/connectDB')
const cors = require('cors')

connectDB()

const app = express()
const PORT = process.env.NODE_DOCKER_PORT || 4000
const v = process.env.VERSION

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(`/api/${v}/affirmations`, require('./routes/affirmationRoutes'))
app.use(`/api/${v}/users`, require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, console.log(`Server listening on port ${PORT}`))
