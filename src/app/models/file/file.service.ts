/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deleteImageFromCloudinary,
  uploadImageIntoCloudinary,
} from './file.utils';

// -------------->> File Upload Service <<------------
const uploadFile = async (imageName: string, file: any) => {
  const uploadImage: any = await uploadImageIntoCloudinary(
    imageName,
    file.path,
  );
  return { url: uploadImage.secure_url };
};

// -------------->> Delete File Service <<------------
const deleteFile = async (imageURL: string) => {
  await deleteImageFromCloudinary(imageURL);
  return null;
};

// -------------->> Exporting File Services <<------------
export const FileServices = { uploadFile, deleteFile };
