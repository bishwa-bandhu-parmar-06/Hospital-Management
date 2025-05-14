const Contact = require('../models/contactModel') ;
const { sendContactThankYouEmail } = require('../utils/emailService');

module.exports.createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });
    // Send thank you email
    await sendContactThankYouEmail(email, name);
    res.status(201).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// Get all contact entries
module.exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};