// Import necessary modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Use Helmet middleware for security
app.use(helmet());

// CORS configuration
const allowedOrigins = ['https://your-allowed-origin.com']; // Replace with your allowed origins
app.use(cors({ origin: allowedOrigins }));

// Middleware to parse JSON bodies
app.use(express.json());

// Your routes go here

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!'); // You can customize this message and status
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
