const { improvements } = require('../models');

function createImprovement(data) {
  const improvement = { id: improvements.length + 1, ...data, createdAt: new Date() };
  improvements.push(improvement);
  return improvement;
}

function listImprovements({ period, responsible }) {
  return improvements.filter(i =>
    (!period || (i.date >= period.start && i.date <= period.end)) &&
    (!responsible || i.responsible === responsible)
  );
}

function getImprovement(id) {
  return improvements.find(i => i.id === Number(id));
}

function updateImprovement(id, data) {
  const improvement = getImprovement(id);
  if (!improvement) throw new Error('Melhoria não encontrada');
  Object.assign(improvement, data);
  return improvement;
}

function deleteImprovement(id) {
  const idx = improvements.findIndex(i => i.id === Number(id));
  if (idx === -1) throw new Error('Melhoria não encontrada');
  improvements.splice(idx, 1);
}

module.exports = {
  createImprovement,
  listImprovements,
  getImprovement,
  updateImprovement,
  deleteImprovement
};
