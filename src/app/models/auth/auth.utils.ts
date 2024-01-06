import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config';
import AppError from '../../error/AppError';
import sendMail from '../../utils/sendMail';

export const matchingPasswords = async (
  hashedPassword: string,
  planPassword: string,
) => {
  let isMatched = false;
  await bcrypt
    .compare(planPassword, hashedPassword)
    .then((result) => {
      isMatched = result;
    })
    .catch((error) => {
      throw new AppError(httpStatus.BAD_REQUEST, error.message);
    });

  return isMatched;
};

export const tokenGenerator = (
  payload: JwtPayload,
  privateKey: string,
  expiresIn: string,
) => {
  const token = jwt.sign(payload, privateKey, { expiresIn });
  return token;
};

export const tokenDecoder = (token: string, privateKey: string) => {
  const decoded = jwt.verify(token, privateKey) as JwtPayload;
  return decoded;
};

export const isTokenGenerateAfterPasswordChange = (
  tokenIssuedAt: number,
  passwordChangeTimestamp: Date,
) => {
  const passwordChangedAt =
    new Date(passwordChangeTimestamp).getTime() / 1000 || 0;
  return tokenIssuedAt > passwordChangedAt;
};

export const sendPasswordResetMail = async (
  name: string,
  email: string,
  passwordResetLink: string,
) => {
  const subject = 'Reset your password';
  const body = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Password Reset ${config.app_name}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri&display=swap" rel="stylesheet"/>
      <style>
      p{
        font-size: 20px;
      }
      </style>
    </head>
    <body>
      <div style="font-family:'Hind Siliguri', sans-serif;">
      <h1>Password Reset Request</h1>
      <p>Hi ${name},</p>
      <p>We received a request to reset your password for your account at ${config.app_name}.</p>
      <p>To reset your password, please click the button below:</p>
      <a href=${passwordResetLink} style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">Reset Password</a>
      <p>If the button doesn't work, try copying and pasting this link into your browser:</p>
      <p style="font-size: 16px;">${passwordResetLink}</p>
      <p>This link will expire in 5 minute.</p>
      <p>If you didn't request this, please ignore this email. Your password will remain unchanged.</p>
      <p>If you have any questions, please feel free to contact us.</p>
      <p>Thanks,<br><strong>${config.app_name} Team</strong></p>
    </div>
    </body>
  </html>`;

  await sendMail(email, subject, body);
};
