const userService = require('../services/userService');

exports.register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.login = (req, res) => {
  try {
    const result = userService.login(req.body);
    res.json(result);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

exports.getProfile = (req, res) => {
  try {
    const profile = userService.getProfile(req.user.id);
    res.json(profile);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

exports.updateProfile = (req, res) => {
  try {
    const profile = userService.updateProfile(req.user.id, req.body);
    res.json(profile);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.logout = (req, res) => {
  // JWT não tem blacklist em memória, simula logout
  res.json({ message: 'Logout realizado com sucesso' });
};

exports.getHistory = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const history = userService.getHistory(req.user.id, Number(limit), Number(offset));
    res.json(history);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
