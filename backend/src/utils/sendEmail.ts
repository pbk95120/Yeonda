import logger from '@src/logger';
import 'dotenv/config';
import nodemailer from 'nodemailer';

const { GMAIL_EMAIL, GMAIL_PASSWORD } = process.env;

export const sendEmail = async (recipient: string, subject: string, text: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_EMAIL,
        pass: GMAIL_PASSWORD,
      },
    });

    const option = {
      from: GMAIL_EMAIL,
      to: recipient,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(option);
    logger.info('비밀번호 초기화 인증 코드 발송 성공', info);
  } catch (error) {
    throw error;
  }
};
