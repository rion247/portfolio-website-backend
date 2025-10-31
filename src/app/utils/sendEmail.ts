import config from '../config';
import nodemailer from 'nodemailer';

const sendEmail = async (from: string, name: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      user: 'vivianrionmarandi@gmail.com',
      pass: 'jzkr ioky mhsz kslj',
    },
  });

  await transporter.sendMail({
    from: 'vivianrionmarandi@gmail.com',
    to: 'vivianrionmarandi@gmail.com',
    subject: `New Message from ${name}!!!`,
    text: `Messaged By: Name: ${name} and Email: ${from} via portfolio website.`,
    html,
    replyTo: from,
  });
};

export default sendEmail;
