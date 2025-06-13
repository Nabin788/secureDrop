const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token" });
    }

    try {
        const verifiedUser = jwt.verify(token, process.env.SECRETKEY);
        if (!verifiedUser) {
            res.status(401).json({ message: "Invalid token" });
        }

        req.user = verifiedUser;
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