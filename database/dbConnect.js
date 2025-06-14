const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async (req,res) => {
    try {
    await mongoose.connect(process.env.DATABASE);

    } catch (error) {
        console.error("Something went wrong",error.message);
        res.status(500).send(error.message);    
    }
}

module.exports = dbConnect;