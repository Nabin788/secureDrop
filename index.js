// Import Express module
const express = require("express");
// create an Instance of express application
const app = express();

// creating server port
const port = 1010;

// Start the server and have it listen on port 1010 for incoming request
app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});