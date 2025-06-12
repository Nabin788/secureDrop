const mongoose = require("mongoose");

const dbConnect = async (req,res) => {
    try {
    await mongoose.connect("mongodb+srv://nabin:whathell@securedrop.abokdmb.mongodb.net/?retryWrites=true&w=majority&appName=secureDrop");

    } catch (error) {
        console.error("Something went wrong",error.message);
        res.status(500).send(error.message);    
    }
}

module.export = dbConnect;