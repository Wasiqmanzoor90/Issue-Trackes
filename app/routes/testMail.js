import express from 'express';
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

router.get('/mail', async (req, res) => {
  try {
    await sendEmail({
      to: 'wasiqmanzoor90@gmail.com',
      subject: '✅ Bug Tracker Test Email',
      text: 'Plain text version',
      html: '<h3>This is a test email from your Bug Tracker App</h3>'
    });

    res.status(200).json({ message: '📨 Email sent successfully' });
  } catch (error) {
    console.error('❌ Email error:', error.message);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

export default router;
