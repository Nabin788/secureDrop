// Creating Router Instance from express module 
const routes = require("express").Router();

const { feedbackRespond, getFeedback, feedbackDelete } = require("../controllers/adminController.js");

// create routes for admin
routes.get("/feedback", getFeedback);
routes.patch("/feedback/:id/respond", feedbackRespond);
routes.delete("/feedback/:id", feedbackDelete);

// exporting admin routes
module.exports = routes;