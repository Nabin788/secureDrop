// Creating Router Instance from express module 
const routes = require("express").Router();

// create routes for admin
routes.get("/", (req,res) => {
    res.send("Welcome to admin roots");
});

// exporting admin routes
module.exports = routes;