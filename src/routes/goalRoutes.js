const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, goalController.createGoal);
router.get('/', authenticateToken, goalController.listGoals);
router.get('/:id', authenticateToken, goalController.getGoal);
router.put('/:id', authenticateToken, goalController.updateGoal);
router.delete('/:id', authenticateToken, goalController.deleteGoal);

module.exports = router;
