const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3131;
const baseURL = '/api/v1';

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(`${baseURL}/affirmations`, require('./routes/affirmationRoutes'));

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
