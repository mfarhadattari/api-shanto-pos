import express from 'express';
import authValidator from '../../middlewares/authValidator';
import { FileControllers } from './file.controller';
import { upload } from './file.utils';

// initialize router
const router = express.Router();

// --------->> Upload File Route <<----------
router.post(
  '/upload',
  authValidator('ADMIN', 'SUPER_ADMIN'),
  upload.single('file'),
  FileControllers.uploadFile,
);

// --------->> Delete File Route <<----------
router.delete(
  '/delete',
  authValidator('ADMIN', 'SUPER_ADMIN'),
  FileControllers.deleteFile,
);

// ----->> Exporting File Routes <<--------
export const FileRoutes = router;
