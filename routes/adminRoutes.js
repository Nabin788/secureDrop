// Creating Router Instance from express module 
const routes = require("express").Router();

const { feedbackUser, feedbackStatus, feedbackDelete } = require("../controllers/adminController.js");

// create routes for admin
routes.get("/feedback", feedbackUser);
routes.patch("/feedback/:id/respond", feedbackStatus);
routes.delete("/feedback/:id", feedbackDelete);

// exporting admin routes
module.exports = routes;