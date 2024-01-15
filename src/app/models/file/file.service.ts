/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deleteImageFromCloudinary,
  uploadImageIntoCloudinary,
} from './file.utils';

// -------------->> File Upload Service <<------------
const uploadFile = async (file: any) => {
  const uploadImage: any = await uploadImageIntoCloudinary(file);
  return { url: uploadImage.secure_url };
};

// -------------->> Delete File Service <<------------
const deleteFile = async (imageURL: string) => {
  await deleteImageFromCloudinary(imageURL);
  return null;
};

// -------------->> Exporting File Services <<------------
export const FileServices = { uploadFile, deleteFile };
