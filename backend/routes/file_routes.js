import express from "express"
import {listFiles,showCreateForm,showFileDetails,createNewFile,deleteFile,UpdateFile,
        showUploadForm,uploadNewFile,showUploadFile,downloadFile,downloadAllFiles,searchFiles} from "../controllers/file_controller.js"
import {uploadMultipleFiles} from "../middleware/upload.js"

const router=express.Router();
router.get('/',listFiles);
router.get('/create-file',showCreateForm);
router.post('/create-file',createNewFile);
router.get('/files/:filename',showFileDetails);
router.get('/delete-file/:filename',deleteFile);
router.get('/update-file/:filename',showCreateForm);
router.get('/upload-file',showUploadForm);
router.post('/upload-file',[uploadMultipleFiles],uploadNewFile);
router.get('/uploads/:filename',showUploadFile);
router.get('/download/:filename',downloadFile);
router.get('/download-all/',downloadAllFiles);
router.get('/search',searchFiles);

export default router;