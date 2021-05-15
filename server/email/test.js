const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'tarunsingh5169202@gmail.com',
  from: 'tarunsingh5169202@outlook.com',
  subject: 'Sending via SendGrid',
  text: 'May it succeed!',
  html: '<h1>Sign up succeeded!</h1>',
};

sgMail
  .send(msg)
  .then(() => console.log('mail sent!'))
  .catch((err) => console.log(err));
