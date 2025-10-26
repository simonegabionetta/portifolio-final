const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticateToken } = require('../middleware/auth');

router.get('/goals-summary', authenticateToken, dashboardController.goalsSummary);
router.get('/progress-graph', authenticateToken, dashboardController.progressGraph);
router.get('/filter', authenticateToken, dashboardController.dashboardFilter);

module.exports = router;
