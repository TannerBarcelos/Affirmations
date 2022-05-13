const express = require('express');
const errorHandler = require('./middlewares/errorMiddleware');
const connectDB = require('./config/connectDB');

// Connect to MongoDB Database (ensure you added MONGO_URI to .env)
connectDB();

const app = express();
const PORT = process.env.PORT;
const baseURL = process.env.BASE_URL;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(`${baseURL}/affirmations`, require('./routes/affirmationRoutes'));
app.use(`${baseURL}/users`, require('./routes/userRoutes'));

// Handle errors
app.use(errorHandler);

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
