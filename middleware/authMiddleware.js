const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    const bearerToken = req.headers["authorization"][1];
    const token = bearerToken.split(" ");

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token" });
    }

    try {
        const verifiedUser = jwt.verify(token, process.env.SECRETKEY);
        if (!verifiedUser) {
            res.status(200).json({ message: "Invalid token" });
        }
        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        res.status(403).json({ message: "Admin access required" });
    }
    next()
}

module.exports = {authMiddleware, adminMiddleware}