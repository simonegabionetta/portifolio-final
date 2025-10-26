const { projects } = require('../models');

function createProject(data) {
  const project = { id: projects.length + 1, ...data, createdAt: new Date() };
  projects.push(project);
  return project;
}

function listProjects({ period, responsible }) {
  return projects.filter(p =>
    (!period || (p.dueDate >= period.start && p.dueDate <= period.end)) &&
    (!responsible || p.responsible === responsible)
  );
}

function getProject(id) {
  return projects.find(p => p.id === Number(id));
}

function updateProject(id, data) {
  const project = getProject(id);
  if (!project) throw new Error('Projeto não encontrado');
  Object.assign(project, data);
  return project;
}

function deleteProject(id) {
  const idx = projects.findIndex(p => p.id === Number(id));
  if (idx === -1) throw new Error('Projeto não encontrado');
  projects.splice(idx, 1);
}

module.exports = {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject
};
