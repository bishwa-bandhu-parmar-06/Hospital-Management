const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    feedback: {
      type: String,
      required: [true, 'Please add feedback'],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    userType: {
      type: String,
      required: true,
      enum: ['patient', 'doctor', 'visitor']
    },
    patientDepartment: {
      type: String,
      required: function() { return this.userType === 'patient'; },
      enum: ['cardiology', 'orthopedics', 'neurology', 'pediatrics', 'other']
    }
  },
  {
    timestamps: true,
  }
);

const FeedBack = mongoose.model('Feedback', feedbackSchema);
module.exports = FeedBack;