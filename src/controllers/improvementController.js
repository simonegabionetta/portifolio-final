const improvementService = require('../services/improvementService');

exports.createImprovement = (req, res) => {
  try {
    const improvement = improvementService.createImprovement({ ...req.body, responsible: req.user.id });
    res.status(201).json(improvement);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.listImprovements = (req, res) => {
  try {
    const { period, responsible } = req.query;
    const periodObj = period ? JSON.parse(period) : undefined;
    const improvements = improvementService.listImprovements({ period: periodObj, responsible });
    res.json(improvements);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getImprovement = (req, res) => {
  try {
    const improvement = improvementService.getImprovement(req.params.id);
    if (!improvement) return res.status(404).json({ error: 'Melhoria não encontrada' });
    res.json(improvement);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.updateImprovement = (req, res) => {
  try {
    const improvement = improvementService.updateImprovement(req.params.id, req.body);
    res.json(improvement);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deleteImprovement = (req, res) => {
  try {
    improvementService.deleteImprovement(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
