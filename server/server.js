const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Set up middleware
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the Vehicle Parking Management System API!');
});

// Connect to MongoDB
mongoose
    .connect('mongodb://localhost/vehicle-parking-system', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
