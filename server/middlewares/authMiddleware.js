const jwt = require("jsonwebtoken");
const userModel = require("../models/usersModel");
const adminModel = require("../models/adminModels");
const doctorModel = require("../models/doctorModels");
const hospitalModel = require("../models/hospitalModels");

module.exports.authenticate = async(req, res, next) =>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await userModel.findById(decoded.id);
        const admin = await adminModel.findById(decoded.id);
        const doctor = await doctorModel.findById(decoded.id);
        const hospital = await hospitalModel.findById(decoded.id);
        if (!user && !admin && !doctor && !hospital) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user || admin || doctor || hospital;
        next();
    } catch (error) {
        console.error("Error in authenticate middleware:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}