const express = require('express');
const { createFeedback , getAllFeedback} = require('../controllers/feedbackController');

const router = express.Router();

router.post('/give-feedback', createFeedback);
router.get('/get-feedback', getAllFeedback);
module.exports = router;