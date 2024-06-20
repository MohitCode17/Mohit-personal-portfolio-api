import nodeMailer from "nodemailer";
import { config } from "../config/env-config.js";

export const sendMail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: config.smtp_host,
    port: config.smtp_port,
    service: config.smtp_service,
    auth: {
      user: config.smtp_mail,
      pass: config.smtp_password,
    },
  });

  const mailOptions = {
    from: config.smtp_mail,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
