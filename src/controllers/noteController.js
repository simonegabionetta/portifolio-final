const noteService = require('../services/noteService');

exports.createNote = (req, res) => {
  try {
    const note = noteService.createNote(req.body);
    res.status(201).json(note);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.listNotes = (req, res) => {
  try {
    const { period } = req.query;
    const periodObj = period ? JSON.parse(period) : undefined;
    const notes = noteService.listNotes({ period: periodObj });
    res.json(notes);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getNote = (req, res) => {
  try {
    const note = noteService.getNote(req.params.id);
    if (!note) return res.status(404).json({ error: 'Anotação não encontrada' });
    res.json(note);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.updateNote = (req, res) => {
  try {
    const note = noteService.updateNote(req.params.id, req.body);
    res.json(note);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deleteNote = (req, res) => {
  try {
    noteService.deleteNote(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
