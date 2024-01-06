import httpStatus from 'http-status';
import { config } from '../config';
import AppError from '../error/AppError';
import { TRole } from '../models/admin/admin.interface';
import { Auth } from '../models/auth/auth.model';
import {
  isTokenGenerateAfterPasswordChange,
  tokenDecoder,
} from '../models/auth/auth.utils';
import catchAsync from '../utils/catchAsync';

const authValidator = (...permissionRole: TRole[]) => {
  return catchAsync(async (req, res, next) => {
    // check token existence
    const accessToken = req.cookies['shanto-pos-access-token'];
    if (!accessToken) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized, token not found',
      );
    }
    // decoding token
    const decode = tokenDecoder(
      accessToken,
      config.access_token_secret as string,
    );
    if (!decode) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized, token is invalid',
      );
    }

    // check admin has permissions
    const isAdminHasPermission = permissionRole.includes(decode.role);
    if (!isAdminHasPermission) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized, you do not have permission',
      );
    }

    // check admin existence
    const admin = await Auth.findById(decode._id);
    if (!admin) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized, admin cannot be found',
      );
    }

    // check admin isBlocked
    if (admin.isBlocked) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized, you cannot access',
      );
    }

    // check token generate after password change
    const isTOkenGenerateAfterPasswordChange =
      isTokenGenerateAfterPasswordChange(
        Number(decode.iat),
        admin.passwordChangedAt,
      );
    if (!isTOkenGenerateAfterPasswordChange) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized, this token in issued before password change',
      );
    }

    req.user = decode;
    next();
  });
};

export default authValidator;
