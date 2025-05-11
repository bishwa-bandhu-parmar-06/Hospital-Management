const userModel = require("../models/usersModel");
const adminModel = require("../models/adminModels");
const doctorModel = require("../models/doctorModels");
const hospitalModel = require("../models/hospitalModels");

// Function to get all users
module.exports.getAllUsers = async(req, res) =>{
    try {
        const users = await userModel.find();
        return res.status(200).json({ message: "All Users",users});
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


// Function to get all admins
module.exports.getAllAdmin = async(req, res) =>{
    try {
        const admin = await adminModel.find();
        return res.status(200).json({ message: "All Admin",admin});
    } catch (error) {
        console.error("Error in getAllAdmins:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


// Function to get all doctors
module.exports.getAllDoctor = async(req, res) =>{
    try {
        const doctor = await doctorModel.find();
        return res.status(200).json({ message: "All Doctor",doctor});
    } catch (error) {
        console.error("Error in getAllDoctors:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



// Function to get all hospitals
module.exports.getAllHospitals = async(req, res) =>{
    try {
        const hospital = await hospitalModel.find();
        return res.status(200).json({ message: "All Hospitals",hospital});
    } catch (error) {
        console.error("Error in get All Hospitals:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}