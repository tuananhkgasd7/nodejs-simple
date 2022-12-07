"use strict";
const nodemailer = require("nodemailer");
const receiver = "tuananhkgasd7@gmail.com";

const sendEmail = async (data) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tuananhkgasd7@gmail.com',
      pass: 'qkwgwybwuptuulvf',
    },
  });

  let info = await transporter.sendMail({
    from: '"Tuấn Anh" <tuananhkgasd7@gmail.com>', 
    to: receiver, 
    subject: data.type, 
    text: JSON.stringify(data.content),
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendEmail;