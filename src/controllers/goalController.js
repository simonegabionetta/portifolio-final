const goalService = require('../services/goalService');

exports.createGoal = (req, res) => {
  try {
    const goal = goalService.createGoal({ ...req.body, responsible: req.user.id });
    res.status(201).json(goal);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.listGoals = (req, res) => {
  try {
    const { type, status, period } = req.query;
    const periodObj = period ? JSON.parse(period) : undefined;
    const goals = goalService.listGoals({ type, status, period: periodObj });
    res.json(goals);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getGoal = (req, res) => {
  try {
    const goal = goalService.getGoal(req.params.id);
    if (!goal) return res.status(404).json({ error: 'Meta não encontrada' });
    res.json(goal);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.updateGoal = (req, res) => {
  try {
    const goal = goalService.updateGoal(req.params.id, req.body);
    res.json(goal);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deleteGoal = (req, res) => {
  try {
    goalService.deleteGoal(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
