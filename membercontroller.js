const memberService = require('../services/memberservice');
const authService = require('../services/authservice');
const Member = require('../models/member');
const ChangePasswordRequest = require('../controllers/request/changepasswordrequest');

exports.profile = (req, res) => {
  const member = authService.getAuthenticatedUser();
  const mappedMember = new Member(member);
  res.json(mappedMember);
};

exports.updateProfile = (req, res) => {
  const updatedMember = memberService.update(req.body.id, req.body);
  res.json(updatedMember);
};

exports.changePassword = (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const result = memberService.changeMyPassword({ currentPassword, newPassword }, req.user.username);
  res.json({ message: result });
};
