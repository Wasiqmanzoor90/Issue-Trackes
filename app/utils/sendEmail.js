import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,       // Your Gmail (e.g. wasi***@gmail.com)
      pass: process.env.EMAIL_PASS        // App password (not your Gmail password)
    }
  });

  const mailOptions = {
    from: `"Bug Tracker App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html
  };

  // ✅ await returns a Promise; no callback needed
  const info = await transporter.sendMail(mailOptions);

  console.log(`📧 Email sent: ${info.messageId}`);
};

export default sendEmail;
