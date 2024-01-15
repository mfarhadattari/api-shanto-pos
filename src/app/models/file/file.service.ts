/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadImageIntoCloudinary } from './file.utils';

// -------------->> File Upload Service <<------------
const uploadFile = async (imageName: string, file: any) => {
  const uploadImage: any = await uploadImageIntoCloudinary(
    imageName,
    file.path,
  );
  return { url: uploadImage.secure_url };
};

// -------------->> Exporting File Services <<------------
export const FileServices = { uploadFile };
