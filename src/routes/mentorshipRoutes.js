const express = require('express');
const router = express.Router();
const mentorshipController = require('../controllers/mentorshipController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, mentorshipController.createMentorship);
router.get('/', authenticateToken, mentorshipController.listMentorships);
router.get('/:id', authenticateToken, mentorshipController.getMentorship);
router.put('/:id', authenticateToken, mentorshipController.updateMentorship);
router.delete('/:id', authenticateToken, mentorshipController.deleteMentorship);

module.exports = router;
