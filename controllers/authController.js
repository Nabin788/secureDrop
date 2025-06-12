const jwt = require("jsonwebtoken");
const userModels = require("../models/userModel.js");

function createToken(user) {
    return jwt.sign({ _id: user._id }, process.env.SECRETKEY, { expiresIn: "1h" });
}

const registerUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: "All field are required" });
        }

        const users = await userModels.findOne({ email });

        if (users) {
            return res.status(401).json({ message: "You have already Account." });
        }

        const user = new userModels({
            email,
            password
        });

        await user.save();

        const generateToken = createToken(user);
        res.status(201).send({ message: "User created sucessfully.", user: user, token: generateToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Unable to register user", error: error.message });
    }

}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: "All field require." });
        }

        const users = await userModels.findOne({ email });
        if (!users) {
            return res.status(401).json({ message: "Invalid user." });
        }

        const userPassword = await users.comparePassword(password);
        if (!userPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const generateToken = createToken(users);
        res.status(200).json({message: "User login sucessfully.", token: generateToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "server error", error: error.message});
    }

}

module.exports = { registerUser, loginUser }