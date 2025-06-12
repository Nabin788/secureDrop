// Import Express module
const express = require("express");

//Import user and admin file
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes.js");
// create an Instance of express application
const app = express();

// creating server port
const port = 1010;

// define admin routes
app.use("/admin", adminRoutes);

//define user routes
app.use("/user", userRoutes);

// Start the server and have it listen on port 1010 for incoming request
app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});