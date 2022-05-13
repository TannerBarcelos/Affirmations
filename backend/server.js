const express = require('express');

const app = express();
const PORT = process.env.PORT;
const baseURL = process.env.BASE_URL;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(`${baseURL}/affirmations`, require('./routes/affirmationRoutes'));

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
