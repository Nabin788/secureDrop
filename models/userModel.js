// Import mongoose library
const mongoose = require("mongoose");

// Import bcrypt module
const bcrypt = require("bcrypt");

// Define user schema 
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"], // only user and admin are valid value
        default: "User"
    }
});

// Create mongoose model name User using userSchema 
const User = new mongoose.model("User", userSchema);

// Pre-save middleware to hash password before save in database
userSchema.pre("save", async function (next) {
    // only modified and new password hash
    if (!this.password("password")) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        // pass any error to the next middleware
        next(error);
    }
});

// method to compare password with hash password
userSchema.methods.comparePassword = function (inputPassword){
    return bcrypt.compare(inputPassword, this.password);
};

// export User model
module.exports = User;