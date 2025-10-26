const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, learningController.createLearning);
router.get('/', authenticateToken, learningController.listLearning);
router.get('/:id', authenticateToken, learningController.getLearning);
router.put('/:id', authenticateToken, learningController.updateLearning);
router.delete('/:id', authenticateToken, learningController.deleteLearning);

module.exports = router;
