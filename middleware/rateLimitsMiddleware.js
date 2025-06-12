const rateLimit = require("express-rate-limit");

const limit = rateLimit({
    windowMS: 15*60*1000,
    max: 100,
    message: "To many request, Please try again later."
});

module.exports = limit;