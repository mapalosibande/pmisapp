const emailService = require('../services/emailservice');
const EmailRequest = require('../controllers/request/emailrequest');

exports.sendEmail = (req, res) => {
  const emailRequest = new EmailRequest(req.body);
  emailService.sendSimpleMail(emailRequest.title, emailRequest.content, emailRequest.recipient);
  res.status(204).send();
};
