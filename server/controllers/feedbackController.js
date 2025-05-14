const Feedback =  require('../models/feedbackModel') ;
const { sendFeedbackThankYouEmail } = require('../utils/emailService');


module.exports.createFeedback = async (req, res, next) => {
  try {
    const { name, email, feedback, rating, userType, patientDepartment } = req.body;

    const feedbackDoc = await Feedback.create({
      name,
      email,
      feedback,
      rating,
      userType,
      ...(userType === 'patient' && { patientDepartment })
    });

    // Send thank you email
    await sendFeedbackThankYouEmail(email, name);
    res.status(201).json({
      success: true,
      data: feedbackDoc,
    });
  } catch (error) {
    next(error);
  }
};

// module.exports.createFeedback = async (req, res, next) => {
//   try {
//     const { name, email, feedback } = req.body;

//     const feedbackDoc = await Feedback.create({
//       name,
//       email,
//       feedback,
//     });

//     // Send thank you email
//     await sendFeedbackThankYouEmail(email, name);
//     res.status(201).json({
//       success: true,
//       data: feedbackDoc,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// Get all feedback entries
module.exports.getAllFeedback = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    next(error);
  }
};