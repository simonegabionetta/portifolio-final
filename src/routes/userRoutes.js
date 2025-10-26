const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', authenticateToken, userController.getProfile);
router.put('/me', authenticateToken, userController.updateProfile);
router.post('/logout', authenticateToken, userController.logout);
router.get('/me/history', authenticateToken, userController.getHistory);

module.exports = router;
