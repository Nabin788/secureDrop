const feedbackModel = require("../models/feedbackModel.js");


// get all feedback with user email
const getFeedback = async (req, res) => {
    const feedbacks = await feedbackMpdel.find().populate("userId", "email");
    try {
        const decrypt = await feedbacks.map((f) => ({
            id: f._id,
            userEmail: f.userId.email,
            text: f.text,
            status: f.status,
            adminResponse: f.adminResponse,
            createdAt: f.createdDate
        }));
        res.json(decrypt);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "can not get feedback:", error: error.message});
    }
}

// Respond to feed 
const feedbackRespond  = async (req,res) => {
    try {
        const { id, response } = req.body;

        if(!text || !id){
            return res.status(401).send("data not find.");
        }

        const fb = await feedbackModel.findById(id);
        if(!fb) return res.status(404).json({message: "feedback not found"});

        fb.adminResponse = response;
        fb.status = "reviewed";
        await fb.save();

        res.send("Respond send");
    } catch (error) {
        console.error(error.message);
        res.staus(500).json({message: "can not respond feedback: ", error: error.message});
    }
}

module.exports = {feedbackRespond, getFeedback};
