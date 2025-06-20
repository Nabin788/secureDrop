const jwt = require("jsonwebtoken");
const userModels = require("../models/userModel.js");
const mail = require("../nodemailer/config.js");
const cookie = require("cookie-parser");

function createToken(user, res) {

    const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY, { expiresIn: "1h" });
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60*60*1000
    });
    return token;
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
        console.log(email, password);

        if (!email || !password) {
            return res.status(401).json({ message: "All field require." });
        }

        const users = await userModels.findOne({ email });
        if (!users) {
            return res.status(401).json({ message: "Invalid user." });
        }

        console.log(password, userPassword);

        const userPassword = await users.comparePassword(password);
        
        if (!userPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const generateToken = createToken(users);
        res.status(200).json({ message: "User login sucessfully.", token: generateToken });
    } catch (error) {
        console.error("Unable to login user", error.message);
        res.status(500).json({ message: "server error", error: error.message });
    }

}

const forgetPassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        if (!email || !password || !confirmPassword) {
            return res.status(401).json({message: "Filed are required to fill."});
        }

        if(password !== confirmPassword) return res.status(401).json({message: "Passowrd and confirm password not match "});

        const user = await userModels.findOne({email});
        if(!user) return res.status(404).json({message: "Invalid user."});

        user.password = password;
        await user.save();

        res.status(201).send({message: "Password Change successfull.", changePassword});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "server error", error: error.message});
    }
}
module.exports = { registerUser, loginUser, forgetPassword }