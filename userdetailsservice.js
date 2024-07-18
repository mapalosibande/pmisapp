const { Member } = require('../models/member');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loadUserByUsername = async (username) => {
  const member = await Member.findOne({ where: { email: username } });
  if (!member) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }
  return member;
};

const authenticateUser = async (username, password) => {
  const member = await loadUserByUsername(username);
  const isMatch = await bcrypt.compare(password, member.password);
  if (!isMatch) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }
  const token = jwt.sign({ username: member.email, role: member.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  return token;
};

module.exports = { loadUserByUsername, authenticateUser };
