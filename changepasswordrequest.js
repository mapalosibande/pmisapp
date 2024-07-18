class ChangePasswordRequest {
    constructor({ oldPassword, newPassword }) {
      this.oldPassword = oldPassword;
      this.newPassword = newPassword;
    }
  }
  
  module.exports = ChangePasswordRequest;
  