import express from 'express';
import { FileControllers } from './file.controller';
import { upload } from './file.utils';

// initialize router
const router = express.Router();

// --------->> Upload File Route <<----------
router.post('/upload', upload.single('file'), FileControllers.uploadFile);

// --------->> Delete File Route <<----------
router.delete('/delete', FileControllers.deleteFile);

// ----->> Exporting File Routes <<--------
export const FileRoutes = router;
