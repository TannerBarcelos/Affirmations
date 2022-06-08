const express = require('express');
const errorHandler = require('./middlewares/errorMiddleware');
const connectDB = require('./config/connectDB');
const cors = require('cors');

// Connect to MongoDB Database
connectDB();

const app = express();
const PORT = process.env.NODE_DOCKER_PORT || 4000;
const v = process.env.VERSION;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(`/api/${v}/affirmations`, require('./routes/affirmationRoutes'));
app.use(`/api/${v}/users`, require('./routes/userRoutes'));

// Handle errors
app.use(errorHandler);

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
