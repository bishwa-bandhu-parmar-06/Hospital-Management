const express = require('express');
const { createContact,getAllContacts } = require('../controllers/contactController');

const router = express.Router();

router.post('/create-contact', createContact);
router.get('/contacts', getAllContacts);
module.exports = router;