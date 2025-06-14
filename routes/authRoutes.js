// create a router instance from express module
const routes = require("express").Router();

const  { registerUser, loginUser, forgetPassword } = require("../controllers/authController.js");

// define GET routes for the root url "/"
routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.put("/forgetPassword", forgetPassword);

// export the routes
module.exports = routes;