const { learning } = require('../models');

function createLearning(data) {
  const learn = { id: learning.length + 1, ...data, createdAt: new Date() };
  learning.push(learn);
  return learn;
}

function listLearning({ type, period, responsible }) {
  return learning.filter(l =>
    (!type || l.type === type) &&
    (!period || (l.date >= period.start && l.date <= period.end)) &&
    (!responsible || l.responsible === responsible)
  );
}

function getLearning(id) {
  return learning.find(l => l.id === Number(id));
}

function updateLearning(id, data) {
  const learn = getLearning(id);
  if (!learn) throw new Error('Aprendizado não encontrado');
  Object.assign(learn, data);
  return learn;
}

function deleteLearning(id) {
  const idx = learning.findIndex(l => l.id === Number(id));
  if (idx === -1) throw new Error('Aprendizado não encontrado');
  learning.splice(idx, 1);
}

module.exports = {
  createLearning,
  listLearning,
  getLearning,
  updateLearning,
  deleteLearning
};
