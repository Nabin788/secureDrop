// Import Express module
const express = require("express");

//Import admin, auth and feedback file
const adminRoutes = require("./routes/adminRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const feedbackRoutes = require("./routes/feedbackRoutes.js");

// create an Instance of express application
const app = express();

// creating server port
const port = 1010;

// define admin, auth and feedback  routes
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("./feedback", feedbackRoutes);

// Start the server and have it listen on port 1010 for incoming request
app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});