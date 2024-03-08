import express from "express"
import {listFiles,showCreateForm,showFileDetails,createNewFile,deleteFile,UpdateFileName,
        showUploadForm,uploadNewFile,downloadFile,downloadAllFiles,searchFiles} from "../controllers/file_controller.js"
import {uploadMultipleFiles} from "../middleware/upload.js"
import {validateInput} from "../middleware/search.js"

const router=express.Router();
router.get('/',listFiles);
router.get('/create-file',showCreateForm);
router.post('/create-file',createNewFile);
router.get('/files/:filename',showFileDetails);
router.get('/delete-file/:filename',deleteFile);
router.put('/update/:filename',UpdateFileName);
router.get('/upload-file',showUploadForm);
router.post('/upload-file',[uploadMultipleFiles],uploadNewFile);
router.get('/download/:filename',downloadFile);
router.get('/download-all/',downloadAllFiles);
router.get('/search',[validateInput],searchFiles);

export default router;