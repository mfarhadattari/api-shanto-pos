/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { v2 as cloudinary } from 'cloudinary';
import httpStatus from 'http-status';
import multer from 'multer';
import streamifier from 'streamifier';
import { config } from '../../config';
import AppError from '../../error/AppError';

export const upload = multer();

// ---------->> cloudinary File Upload <<------------
cloudinary.config(config.cloudinary_config);

export const uploadImageIntoCloudinary = async (file: any) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export const deleteImageFromCloudinary = async (imageURL: string) => {
  const publicId = imageURL
    .split('/')
    [imageURL.split('/').length - 1].split('.')[0];
  await cloudinary.uploader
    .destroy(publicId)
    .then((result) => {
      if (result.result !== 'ok') {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete image');
      }
    })
    .catch((err) => {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete image');
    });
};
