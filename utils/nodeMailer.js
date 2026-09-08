const nodemailer = require("nodemailer");

async function sendEmailResetWithToken() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Reset your password",
    html: `<p>Click here to reset: <a href="${resetLink}">${resetLink}</a></p>`,
  });
}

module.exports = {
  sendEmailResetWithToken,
};
