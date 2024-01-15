import express from 'express';
import { FileControllers } from './file.controller';
import { upload } from './file.utils';

// initialize router
const router = express.Router();

// --------->> Upload File <<----------
router.post('/upload', upload.single('file'), FileControllers.uploadFile);

// ----->> Exporting File Routes <<--------
export const FileRoutes = router;
