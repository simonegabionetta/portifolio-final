const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, noteController.createNote);
router.get('/', authenticateToken, noteController.listNotes);
router.get('/:id', authenticateToken, noteController.getNote);
router.put('/:id', authenticateToken, noteController.updateNote);
router.delete('/:id', authenticateToken, noteController.deleteNote);

module.exports = router;
