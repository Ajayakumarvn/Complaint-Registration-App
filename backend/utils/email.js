// import nodemailer from "nodemailer";

// const sendEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "ladygang.24@gmail.com",
//       pass: "#google_ladygang@24",
//     },
//   });

//   const mailOptions = {
//     from: "ladygang.24@gmail.com",
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };
//   await transporter.sendMail(mailOptions);
// };

// export default sendEmail;

// import dotenv from "dotenv";
// dotenv.config({ path: "./config.env" });
// import nodemailer from "nodemailer";

// const sendEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: "neerajedure@gmail.com",
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   await transporter.sendMail(mailOptions);
// };

// export default sendEmail;


import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  for (const recipient of options.recipients) {
    const mailOptions = {
      from: "neerajedure@gmail.com",
      to: recipient.email,
      subject: options.subject,
      text: recipient.message,
    };

    await transporter.sendMail(mailOptions);
  }
};

export default sendEmail;

