const authService = require('../services/authservice');
const memberService = require('../services/memberservice');
const AuthRequest = require('../controllers/request/authrequest');
const RegisterRequest = require('../controllers/request/registerrequest');
const ChangePasswordRequest = require('../controllers/request/changepasswordrequest');
const ForgotPasswordRequest = require('../controllers/request/forgotpasswordrequest');
const MemberResponse = require('../controllers/response/memberresponse');

exports.token = async (req, res) => {
try {
const authRequest = new AuthRequest(req.body);
const tokenResponse = await authService.issueAccessToken(authRequest);
res.status(200).json(tokenResponse);
} catch (error) {
res.status(500).json({ message: 'Error issuing token', error: error.message });
}
};

exports.registerOwner = async (req, res) => {
try {
const registerRequest = new RegisterRequest(req.body);
const member = await authService.registerOwner(registerRequest);
const memberResponse = new MemberResponse(member);
res.status(201).json(memberResponse.toJSON());
} catch (error) {
res.status(500).json({ message: 'Error registering owner', error: error.message });
}
};

exports.registerCustomer = async (req, res) => {
try {
const registerRequest = new RegisterRequest(req.body);
const member = await authService.registerCustomer(registerRequest);
const memberResponse = new MemberResponse(member);
res.status(201).json(memberResponse.toJSON());
} catch (error) {
res.status(500).json({ message: 'Error registering customer', error: error.message });
}
};

exports.changePassword = async (req, res) => {
try {
const passwordRequest = new ChangePasswordRequest(req.body);
const response = await memberService.changePassword(passwordRequest);
res.status(200).send(response);
} catch (error) {
res.status(500).json({ message: 'Error changing password', error: error.message });
}
};

exports.forgotPassword = async (req, res) => {
try {
const forgotPasswordRequest = new ForgotPasswordRequest(req.body);
const response = await memberService.forgotPassword(forgotPasswordRequest);
res.status(200).send(response);
} catch (error) {
res.status(500).json({ message: 'Error handling forgot password', error: error.message });
}
};