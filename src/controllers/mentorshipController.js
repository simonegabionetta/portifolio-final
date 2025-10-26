const mentorshipService = require('../services/mentorshipService');

exports.createMentorship = (req, res) => {
  try {
    const mentorship = mentorshipService.createMentorship({ ...req.body, responsible: req.user.id });
    res.status(201).json(mentorship);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.listMentorships = (req, res) => {
  try {
    const { period, responsible } = req.query;
    const periodObj = period ? JSON.parse(period) : undefined;
    const mentorships = mentorshipService.listMentorships({ period: periodObj, responsible });
    res.json(mentorships);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getMentorship = (req, res) => {
  try {
    const mentorship = mentorshipService.getMentorship(req.params.id);
    if (!mentorship) return res.status(404).json({ error: 'Mentoria não encontrada' });
    res.json(mentorship);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.updateMentorship = (req, res) => {
  try {
    const mentorship = mentorshipService.updateMentorship(req.params.id, req.body);
    res.json(mentorship);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deleteMentorship = (req, res) => {
  try {
    mentorshipService.deleteMentorship(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
