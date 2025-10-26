const { mentorships } = require('../models');

function createMentorship(data) {
  const mentorship = { id: mentorships.length + 1, ...data, createdAt: new Date() };
  mentorships.push(mentorship);
  return mentorship;
}

function listMentorships({ period, responsible }) {
  return mentorships.filter(m =>
    (!period || (m.date >= period.start && m.date <= period.end)) &&
    (!responsible || m.responsible === responsible)
  );
}

function getMentorship(id) {
  return mentorships.find(m => m.id === Number(id));
}

function updateMentorship(id, data) {
  const mentorship = getMentorship(id);
  if (!mentorship) throw new Error('Mentoria não encontrada');
  Object.assign(mentorship, data);
  return mentorship;
}

function deleteMentorship(id) {
  const idx = mentorships.findIndex(m => m.id === Number(id));
  if (idx === -1) throw new Error('Mentoria não encontrada');
  mentorships.splice(idx, 1);
}

module.exports = {
  createMentorship,
  listMentorships,
  getMentorship,
  updateMentorship,
  deleteMentorship
};
