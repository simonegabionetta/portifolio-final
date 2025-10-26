const dashboardService = require('../services/dashboardService');

exports.goalsSummary = (req, res) => {
  try {
    const summary = dashboardService.goalsSummary();
    res.json(summary);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.progressGraph = (req, res) => {
  try {
    const { period } = req.query;
    const periodObj = period ? JSON.parse(period) : undefined;
    const graph = dashboardService.progressGraph({ period: periodObj });
    res.json(graph);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.dashboardFilter = (req, res) => {
  try {
    const { type, status, period } = req.query;
    const periodObj = period ? JSON.parse(period) : undefined;
    const data = dashboardService.dashboardFilter({ type, status, period: periodObj });
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
