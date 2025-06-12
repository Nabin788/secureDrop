// create a router instance from express module
const routes = require("express").Router();

// define GET routes for the root url "/"
routes.get("/", (req,res) => {
    res.send("Welcome to secure Drop, where you can write complain, feedback and report without reveling their identity.");
});


// export the routes
module.exports = routes;