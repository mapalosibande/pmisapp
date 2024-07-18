const nodemailer = require('nodemailer');
const winston = require('winston'); // Logging library
require('dotenv').config(); // To load environment variables

class EmailService {
  constructor(sender, isEnabled) {
    this.sender = sender;
    this.isEnabled = isEnabled;
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
      ]
    });

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple()
      }));
    }
  }

  async sendSimpleMail(title, content, recipient) {
    if (!this.isEnabled) {
      this.logger.info("Email service is disabled, skipped sending email...");
      return;
    }

    try {
      await this.transporter.sendMail({
        from: this.sender,
        to: recipient,
        subject: title,
        text: content
      });
      this.logger.info(`Mail sent successfully to ${recipient}`);
    } catch (error) {
      this.logger.error(`Error while sending mail to ${recipient}: ${error.message}`);
      // Optional: Add retry logic here
    }
  }
}

module.exports = EmailService;
