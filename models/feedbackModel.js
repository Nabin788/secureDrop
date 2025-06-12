const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "reviewed"],
        default: "pending"
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    adminResponse: {
        type: String,
        default: ""
    }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;