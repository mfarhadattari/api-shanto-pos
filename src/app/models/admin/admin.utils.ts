import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { config } from '../../config';
import AppError from '../../error/AppError';

// ------------------>> Generate User Name <<-------------
export const generateUsername = (email: string) => {
  const username = email.split('@')[0];
  const fourDigit = Math.round(Math.random() * 10000);

  return `${username}${fourDigit}`;
};

// ------------------>> Hashed Password <<-------------
export const hashedPassword = async (password: string) => {
  let hashedPass;
  await bcrypt
    .hash(password, Number(config.bcrypt_salt_rounds))
    .then((hash) => {
      hashedPass = hash;
    })
    .catch((error) => {
      throw new AppError(httpStatus.BAD_REQUEST, error.message);
    });
  return hashedPass;
};
