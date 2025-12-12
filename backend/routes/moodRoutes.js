const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');
const authMiddleware = require('../middleware/auth');

// All mood routes require authentication
router.post('/', authMiddleware, moodController.createMoodValidation, moodController.createMood);
router.get('/', authMiddleware, moodController.getMoods);
router.get('/:date', authMiddleware, moodController.getMoodByDate);
router.put('/:id', authMiddleware, moodController.updateMoodValidation, moodController.updateMood);
router.delete('/:id', authMiddleware, moodController.deleteMood);


module.exports = router;