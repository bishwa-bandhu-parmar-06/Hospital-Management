const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        match: [/^[6-9]\d{9}$/, 'Please enter a valid phone number.'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    website: {
        type: String,
    },
    logo: {
        type: String,
    },
    bannerImage: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
    },
    role: {
        type: String,
        default: 'hospital'
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
    facilities: [String],
    departments: [String]
}, { timestamps: true });

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;