const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
    username: { 
        type: String, 
        unique: true, 
        required: true 
    },
    name: { 
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    password: { 
        type: String, 
        required: true
    },
    role: { 
        type: String,
        default: 'admin'
    },
    profileImage: {
        type: String
    }, // Add this field
    id: {
        type: Number,
        required: true,
    }
});

adminSchema.index({ name: 'text' });

adminSchema.methods.generateToken = async function(){
    try{
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isRole: this.role
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "30s"
            }
        )
    }catch(error){
        console.log("JWT:"+error);
    }
}


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
