const express = require('express');
const router = express.Router();
const improvementController = require('../controllers/improvementController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, improvementController.createImprovement);
router.get('/', authenticateToken, improvementController.listImprovements);
router.get('/:id', authenticateToken, improvementController.getImprovement);
router.put('/:id', authenticateToken, improvementController.updateImprovement);
router.delete('/:id', authenticateToken, improvementController.deleteImprovement);

module.exports = router;
