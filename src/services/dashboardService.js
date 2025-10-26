const { goals } = require('../models');

function goalsSummary() {
  const summary = { pessoal: { planejada: 0, concluida: 0 }, profissional: { planejada: 0, concluida: 0 } };
  goals.forEach(g => {
    if (g.type === 'Pessoal') {
      summary.pessoal.planejada++;
      if (g.status === 'concluida') summary.pessoal.concluida++;
    } else if (g.type === 'Profissional') {
      summary.profissional.planejada++;
      if (g.status === 'concluida') summary.profissional.concluida++;
    }
  });
  return summary;
}

function progressGraph({ period }) {
  // Exemplo simplificado: retorna quantidade de metas concluídas por mês
  const data = {};
  goals.forEach(g => {
    if (!period || (g.dueDate >= period.start && g.dueDate <= period.end)) {
      const month = new Date(g.dueDate).toISOString().slice(0,7);
      if (!data[month]) data[month] = { planejada: 0, concluida: 0 };
      data[month].planejada++;
      if (g.status === 'concluida') data[month].concluida++;
    }
  });
  return data;
}

function dashboardFilter({ type, status, period }) {
  return goals.filter(g =>
    (!type || g.type === type) &&
    (!status || g.status === status) &&
    (!period || (g.dueDate >= period.start && g.dueDate <= period.end))
  );
}

module.exports = {
  goalsSummary,
  progressGraph,
  dashboardFilter
};
