const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const Admin = require("../models/adminModels");
const Doctor = require("../models/doctorModels");
const Hospital = require("../models/hospitalModels");

// Main authentication middleware
module.exports.authenticate = async(req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) return res.status(401).json({ message: "Unauthorized" });
        
        // Check all user types
        const user = await User.findById(decoded.id);
        const admin = await Admin.findById(decoded.id);
        const doctor = await Doctor.findById(decoded.id);
        const hospital = await Hospital.findById(decoded.id);
        
        const authenticatedUser = user || admin || doctor || hospital;
        if (!authenticatedUser) return res.status(401).json({ message: "Unauthorized" });
        
        // Check if doctor/hospital is approved
        if (['doctor', 'hospital'].includes(authenticatedUser.role) && 
            authenticatedUser.status !== 'approved') {
            return res.status(403).json({ message: "Account pending approval" });
        }
        
        req.user = authenticatedUser;
        next();
    } catch (error) {
        console.error("Error in authenticate middleware:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Role-based access control middleware
module.exports.authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access forbidden" });
    }
    next();
};

// Admin-specific middleware
module.exports.adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
    }
    next();
};