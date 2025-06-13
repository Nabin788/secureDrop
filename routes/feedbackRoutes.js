// create a router instance from express module
const routes = require("express").Router();

const { feedbackStatus, feedbackUser } = require("../controllers/feedbackController.js");
const { authMiddleware } = require("../middleware/authMiddleware.js");

// define GET routes for the root url "/"
routes.post("/submit", authMiddleware, feedbackUser);
routes.get("/status", authMiddleware, feedbackStatus);

// export the routes
module.exports = routes;