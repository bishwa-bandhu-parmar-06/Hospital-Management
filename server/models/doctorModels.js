
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
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
    bannerImage:{
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
        default: 'doctor'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    documents: [{
        name: String,
        url: String,
        verified: Boolean
    }],
    specialization: String,
    qualifications: [String],
    experience: Number,
    availability: [{
        day: String,
        slots: [{
            start: String,
            end: String,
            type: { type: String, enum: ['online', 'offline'] }
        }]
    }]
}, { timestamps: true });

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;