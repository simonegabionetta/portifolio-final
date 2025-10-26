const learningService = require('../services/learningService');

exports.createLearning = (req, res) => {
  try {
    const learning = learningService.createLearning({ ...req.body, responsible: req.user.id });
    res.status(201).json(learning);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.listLearning = (req, res) => {
  try {
    const { type, period, responsible } = req.query;
    const periodObj = period ? JSON.parse(period) : undefined;
    const learnings = learningService.listLearning({ type, period: periodObj, responsible });
    res.json(learnings);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getLearning = (req, res) => {
  try {
    const learning = learningService.getLearning(req.params.id);
    if (!learning) return res.status(404).json({ error: 'Aprendizado não encontrado' });
    res.json(learning);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.updateLearning = (req, res) => {
  try {
    const learning = learningService.updateLearning(req.params.id, req.body);
    res.json(learning);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deleteLearning = (req, res) => {
  try {
    learningService.deleteLearning(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
