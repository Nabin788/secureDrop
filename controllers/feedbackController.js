const feedbackModels = require("../models/feedbackModel.js");

const feedbackUser = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(401).send("Please Insert text.");
        }

        const feedback = feedbackModels({
            text,
            userId: req.user._id
        });

        await feedback.save();

        res.status(201).send({ message: "Feedback submit successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

const feedbackStatus = async (req, res) => {
    try {
        const feedStatus = await feedbackModels({ userId: req.user._id }).select("text");
        res.json(feedStatus);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
}

const feedbackDelete = async (req,res) => {
    try {
        const { id } = req.body;
        if(!id){
            return res.status(401).json({message: "user not found"});
        }

        const userID = await feedbackModels.findByIdAndDelete(id);
        if(!userID){
            return res.status(401).json({message: "User not found"});
        }
        res.status(200).json({messsage: "Feedback deleted successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: error.message});
    }
}
module.exports = { feedbackUser, feedbackStatus, feedbackDelete };