const { goals } = require('../models');

function createGoal(data) {
  const goal = { id: goals.length + 1, ...data, status: 'planejada', createdAt: new Date() };
  goals.push(goal);
  return goal;
}

function listGoals({ type, status, period }) {
  return goals.filter(g =>
    (!type || g.type === type) &&
    (!status || g.status === status) &&
    (!period || (g.dueDate >= period.start && g.dueDate <= period.end))
  );
}

function getGoal(id) {
  return goals.find(g => g.id === Number(id));
}

function updateGoal(id, data) {
  const goal = getGoal(id);
  if (!goal) throw new Error('Meta não encontrada');
  Object.assign(goal, data);
  return goal;
}

function deleteGoal(id) {
  const idx = goals.findIndex(g => g.id === Number(id));
  if (idx === -1) throw new Error('Meta não encontrada');
  goals.splice(idx, 1);
}

module.exports = {
  createGoal,
  listGoals,
  getGoal,
  updateGoal,
  deleteGoal
};
