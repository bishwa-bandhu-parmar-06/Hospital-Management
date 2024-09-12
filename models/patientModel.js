// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const patientSchema = new mongoose.Schema({
  
//     name: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     mobilenumber: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     // otp: {
//     //     type: String,
//     //     required: true,
//     // },
//     otpExpiration: {
//         type: Date,  //2024-05-05
//         default: Date.now(),
//         get: (otpExpiration) => otpExpiration.getTime(),
//         set: (otpExpiration) => new Date(otpExpiration)
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     dob: {
//         type: Date,
//         required: true
//     },
//     gender: {
//         type: String,
//         enum: ['male', 'female', 'not_specified'],
//         required: true
//     },
//     State: {
//         type: String,
//         required: true
//     },
//     District: {
//         type: String,
//         required: true
//     },
//     City: {
//         type: String,
//         required: true
//     },
//     Pincode: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
    
//     profileImage: {
//         type: String
//     }, // Add this field

//     role: {
//         type: String,
//         enum: ['admin', 'doctor', 'patient'],
//         default: 'patient'
//     },
// });


// patientSchema.pre('save', async function (next) {
//   const user = this;
//   if (!user.isModified('password')) return next();
//   const hash = await bcrypt.hash(user.password, 10);
//   user.password = hash;
//   next();
// });

// patientSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// patientSchema.index({ name: 'text' });

// const User = mongoose.model('Patient', patientSchema);

// module.exports = User;


// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    mobilenumber: {
        type: String,
        unique: true,
    },
    otpExpiration: {
        type: Date,
        default: Date.now,
        get: (otpExpiration) => otpExpiration.getTime(),
        set: (otpExpiration) => new Date(otpExpiration)
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'not_specified'],
        required: true
    },
    State: {
        type: String,
        required: true
    },
    District: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Pincode: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    role: {
        type: String,
        default: 'patient'
    }
});

// patientSchema.pre('save', async function (next) {
//     const user = this;
//     if (!user.isModified('password')) return next();
//     const hash = await bcrypt.hash(user.password, 10);
//     user.password = hash;
//     next();
// });

// patientSchema.methods.comparePassword = async function (candidatePassword) {
//     return bcrypt.compare(candidatePassword, this.password);
// };

// patientSchema.index({ name: 'text' });

const User = mongoose.model('Patient', patientSchema);

module.exports = User;
