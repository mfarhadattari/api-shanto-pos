import httpStatus from 'http-status';
import nodemailer from 'nodemailer';
import { config } from '../config';
import AppError from '../error/AppError';

const transporter = nodemailer.createTransport({
  host: config.nodemailer_host,
  port: Number(config.nodemailer_port),
  secure: true,
  auth: {
    user: config.nodemailer_user,
    pass: config.nodemailer_password,
  },
});

const sendMail = async (to: string, subject: string, body: string) => {
  try {
    await transporter.sendMail({
      from: config.nodemailer_user,
      to: to,
      subject: subject || `Mail from ${config.app_name}`,
      html: body,
    });
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to send mail');
  }
};

export default sendMail;
