import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/AppError';

export const matchingPasswords = async (
  hashedPassword: string,
  planPassword: string,
) => {
  let isMatched = false;
  await bcrypt
    .compare(planPassword, hashedPassword)
    .then(() => {
      isMatched = true;
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
  const passwordChangedAt = new Date(passwordChangeTimestamp).getTime() / 1000;
  return tokenIssuedAt > passwordChangedAt;
};
