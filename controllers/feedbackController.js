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

module.exports = { feedbackUser, feedbackStatus };