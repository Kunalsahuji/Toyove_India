import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

const testEmail = async () => { 
  console.log('Testing SMTP with:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Toyovo Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to self
      subject: 'SMTP Test from Toyovo Backend',
      text: 'If you see this, SMTP is working!',
      html: '<h1>SMTP is working!</h1>',
    });
    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('SMTP Error:', error.message);
  }
};

testEmail();
