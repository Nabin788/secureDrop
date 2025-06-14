const nodemailer = require("nodemailer");
require("dotenv").config();

const mailConfig = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD
    }
});

module.exports = mailConfig;