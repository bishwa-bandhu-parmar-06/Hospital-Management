const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    mobile: {
        type: String,
        required: true,
        match: [/^[6-9]\d{9}$/, 'Please enter a valid mobile number.']
    },
    profilePhoto: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'hospital', 'admin'],
        default: 'admin'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'approved' // Patients are auto-approved
    },
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
