"use strict";
const nodemailer = require("nodemailer");
const fs = require("fs");
const ejs = require('ejs');

// const receiver = "htran201@dxc.com";
const from = 'tuananhkgasd7@gmail.com'
const to = "tuananhkgasd7@gmail.com";
const sender1 = {username: "tuananhkgasd7@gmail.com", password: "qkwgwybwuptuulvf"};
const sender2 = {username: "tuananhkgasd7@gmail.com", password: "qkwgwybwuptuulvf"};
const templatePath = 'src/server/views/mail.ejs';
const appConfig ={ 
  smtpConfig1: {
    service: 'gmail',
    auth: {
      user: sender1.username,
      pass: sender1.password,
    },
  },
  smtpConfig2: {
    service: 'gmail',
    auth: {
      user: sender2.username,
      pass: sender2.password,
    },
  },
}

// Convert data from Template and data to html
function bindDataTemplate(templatePath, templateVars) {
  if (templatePath && fs.existsSync(templatePath)) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const refinedTemplate = template.replace(/[\r|\n|\t]?/g, '');
    const html = ejs.render(refinedTemplate, templateVars);
    return html;
  } else {
    throw new Error(`Template '${templatePath}' not exist.`);
  }
}

const sendEmail = async (from, to, subject, body, smtpConfig) => {
  return new Promise((resolve, reject) => {
    console.log('Start send email');
    const transporter = nodemailer.createTransport(smtpConfig);
    const mailOptions = { from, to, subject, html: bindDataTemplate(templatePath,{product: body}) };

    transporter.sendMail(mailOptions, (error, info) => {
      error ? reject(error) : resolve(info.response);
    });
  });
};

const sendMailRetry = async (subject, body) => {
  try {
    await sendEmail(from, to, subject, body, appConfig.smtpConfig1);
  } catch (_) {
    await sendEmail(from, to, subject, body, appConfig.smtpConfig2);
  }
};

const sendEmailToReceiver = async function (subject, body) {
  await sendMailRetry(subject, body);
};

module.exports = {sendEmailToReceiver, bindDataTemplate};