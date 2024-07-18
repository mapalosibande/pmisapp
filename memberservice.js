const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Member = require ('../models/member');
const PasswordResetToken = require('../models/passwordresettoken');

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Replace with your SMTP server host
  port: 587, // Replace with your SMTP server port
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your-email@example.com', // Replace with your email
    pass: 'your-password' // Replace with your password
  }
});

const resetPasswordUrl = process.env.RESET_PASSWORD_URL || 'http://localhost:3000/reset-password';
const MemberStatus = require('../entity/type/memberstatus');

// Example usage in a function
function updateMemberStatus(memberId, newStatus) {
  // Logic to update member status
  console.log(`Updating status of member ${memberId} to ${newStatus}`);

  // Example condition based on status
  if (newStatus === MemberStatus.ACTIVE) {
    // Handle active member logic
  } else if (newStatus === MemberStatus.INACTIVE) {
    // Handle inactive member logic
  }
}

  


async function findByEmail(email) {
  return await Member.findOne({ email }).exec();
}

async function profile(id) {
  return await Member.findById(id).exec();
}

async function findById(id) {
  return await Member.findById(id).exec();
}

async function update(id, member) {
  const existingMember = await Member.findById(id).exec();
  if (!existingMember) {
    throw new Error('Member not found');
  }
  existingMember.set({
    phone: member.phone,
    address: member.address,
    city: member.city,
    state: member.state,
    zip: member.zip
  });
  return await existingMember.save();
}

async function changePassword(changePasswordRequest) {
  if (changePasswordRequest.newPassword !== changePasswordRequest.confirmNewPassword) {
    throw new Error('Password does not match');
  }
  const token = validatePasswordResetToken(changePasswordRequest.token);
  if (token) {
    throw new Error('Invalid or expired token');
  }
  const member = await getUserByPasswordResetToken(changePasswordRequest.token);
  if (!member) {
    throw new Error('Member not found');
  }
  member.password = await bcrypt.hash(changePasswordRequest.newPassword, 10);
  await member.save();
  return 'Password changed successfully';
}

async function changeMyPassword(changePasswordRequest, email) {
  const member = await Member.findOne({ email }).exec();
  if (!member) {
    throw new Error('Member not found');
  }
  const isMatch = await bcrypt.compare(changePasswordRequest.oldPassword, member.password);
  if (!isMatch) {
    throw new Error('Incorrect old password');
  }
  if (changePasswordRequest.newPassword !== changePasswordRequest.confirmNewPassword) {
    throw new Error('Password does not match');
  }
  member.password = await bcrypt.hash(changePasswordRequest.newPassword, 10);
  await member.save();
  return 'Password changed successfully';
}

async function forgotPassword(forgotPasswordRequest) {
  const member = await Member.findOne({ email: forgotPasswordRequest.email }).exec();
  if (!member) {
    throw new Error('Member not found');
  }
  const token = await createPasswordResetTokenForUser(member);
  const content = `To reset your password, click the link below:\n${resetPasswordUrl}?token=${token}`;
  await sendEmail('PMS Reset Password', content, member.email);
  return `Reset password link sent to your email: ${member.email}`;
}

async function resetPassword(email, password) {
  const member = await Member.findOne({ email }).exec();
  if (!member) {
    throw new Error('Member not found');
  }
  member.password = await bcrypt.hash(password, 10);
  await member.save();
  return 'Password reset successfully';
}

async function createPasswordResetTokenForUser(user) {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const passwordResetToken = new PasswordResetToken({
    token,
    user: user._id,
    expiryDate: new Date(Date.now() + 3600000) // 1 hour
  });
  await passwordResetToken.save();
  return token;
}

async function validatePasswordResetToken(token) {
  const passToken = await PasswordResetToken.findOne({ token }).exec();
  if (!passToken) {
    return 'invalidToken';
  }
  if (passToken.expiryDate < Date.now()) {
    return 'expired';
  }
  return null;
}

async function getUserByPasswordResetToken(token) {
  const passToken = await PasswordResetToken.findOne({ token }).exec();
  if (!passToken) {
    return null;
  }
  return await Member.findById(passToken.user).exec();
}

async function sendEmail(title, content, recipient) {
  try {
    const mailOptions = {
      from: 'your-email@example.com',
      to: recipient,
      subject: title,
      text: content
    };
    await transporter.sendMail(mailOptions);
    console.log('Mail Sent Successfully...');
  } catch (error) {
    console.error('Error while Sending Mail:', error);
  }
}

module.exports = {
  findByEmail,
  profile,
  findById,
  update,
  changePassword,
  changeMyPassword,
  forgotPassword,
  resetPassword
};
