const { notes } = require('../models');

function createNote({ content }) {
  const note = { id: notes.length + 1, content, date: new Date() };
  notes.push(note);
  return note;
}

function listNotes({ period }) {
  return notes.filter(n =>
    !period || (n.date >= period.start && n.date <= period.end)
  );
}

function getNote(id) {
  return notes.find(n => n.id === Number(id));
}

function updateNote(id, data) {
  const note = getNote(id);
  if (!note) throw new Error('Anotação não encontrada');
  Object.assign(note, data);
  return note;
}

function deleteNote(id) {
  const idx = notes.findIndex(n => n.id === Number(id));
  if (idx === -1) throw new Error('Anotação não encontrada');
  notes.splice(idx, 1);
}

module.exports = {
  createNote,
  listNotes,
  getNote,
  updateNote,
  deleteNote
};
