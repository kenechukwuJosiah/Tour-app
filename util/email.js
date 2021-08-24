const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //Define email options
  const mailOpt = {
    from: 'Kenechukwu Josiah <kene@mail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //send email
  await transporter.sendMail(mailOpt);
};

module.exports = sendEmail;
