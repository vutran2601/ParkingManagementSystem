const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const db = require("./db/conn");


// Set up middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the Parking Management System API!');
});
app.use('/vehicle', require('./routes/index'))

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);

    db.connect()
        .then(() => {
            // Database connection is established
            console.log("Connected to Parking Management System database");
        })
        .catch((error) => {
            // Error occurred during connection
            console.error("Error connecting to the database:", error);
        })
});
