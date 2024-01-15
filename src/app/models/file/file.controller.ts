import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FileServices } from './file.service';

// -------------->> File Upload Controller <<------------
const uploadFile = catchAsync(async (req, res) => {
  const file = req.file;
  const fileName = (req.query.fileName || Date.now()) as string;
  const result = await FileServices.uploadFile(fileName, file);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'File Upload Successfully',
    data: result,
  });
});

// -------------->> File Delete Controller <<------------
const deleteFile = catchAsync(async (req, res) => {
  const url = req.query.url as string;
  const result = await FileServices.deleteFile(url);

  sendResponse(res, {
    status: httpStatus.OK,
    message: 'File Deleted Successfully',
    data: result,
  });
});

// -------------->> Exporting File Controllers <<------------
export const FileControllers = { uploadFile, deleteFile };
