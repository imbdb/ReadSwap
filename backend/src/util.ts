import { Logger } from '@nestjs/common';
import * as formData from 'form-data';
import Mailgun from 'mailgun.js';

const logger = new Logger('Util');

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
});

async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html?: string,
) {
  const data = {
    from: process.env.MAILGUN_FROM_EMAIL,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    const response = await mg.messages.create(
      process.env.MAILGUN_DOMAIN || '',
      data,
    );

    logger.log('Email sent: ' + response.message);
    return response;
  } catch (error) {
    logger.error('Error sending email: ' + error);
    return error;
  }
}

export { sendEmail };
