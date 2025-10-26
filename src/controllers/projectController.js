const projectService = require('../services/projectService');

exports.createProject = (req, res) => {
  try {
    const project = projectService.createProject({ ...req.body, responsible: req.user.id });
    res.status(201).json(project);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.listProjects = (req, res) => {
  try {
    const { period, responsible } = req.query;
    const periodObj = period ? JSON.parse(period) : undefined;
    const projects = projectService.listProjects({ period: periodObj, responsible });
    res.json(projects);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getProject = (req, res) => {
  try {
    const project = projectService.getProject(req.params.id);
    if (!project) return res.status(404).json({ error: 'Projeto não encontrado' });
    res.json(project);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.updateProject = (req, res) => {
  try {
    const project = projectService.updateProject(req.params.id, req.body);
    res.json(project);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deleteProject = (req, res) => {
  try {
    projectService.deleteProject(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
