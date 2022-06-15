import nodemailer, { SendMailOptions, SentMessageInfo } from "nodemailer";

const sendMail = async ({ receipientEmail, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7a3cdebe8da38f",
      pass: "bd55e08921aa27",
    },
  });

  const emailOptions = {
    from: "Farhan Jamil <farhan@gmail.com>",
    to: receipientEmail,
    subject,
    text,
  };

  await transporter.sendMail(emailOptions);
};

export default sendMail;
