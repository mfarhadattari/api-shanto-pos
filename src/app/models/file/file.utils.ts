/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import httpStatus from 'http-status';
import multer from 'multer';
import path from 'path';
import { config } from '../../config';
import AppError from '../../error/AppError';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), '/upload/'));
  },
  filename: function (req, file, cb) {
    const fileName = `${file.fieldname}-${Date.now()}`;
    cb(null, fileName);
  },
});

export const upload = multer({ storage: storage });

// ---------->> cloudinary File Upload <<------------
cloudinary.config(config.cloudinary_config);

export const uploadImageIntoCloudinary = async (
  imageName: string,
  path: string,
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
          fs.unlink(path, (err) => {
            if (err) {
              throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to deleted file',
              );
            }
          });
        }
        resolve(result);
        fs.unlink(path, (err) => {
          if (err) {
            throw new AppError(
              httpStatus.BAD_REQUEST,
              'Failed to deleted file',
            );
          }
        });
      },
    );
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
