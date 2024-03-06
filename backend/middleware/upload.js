import multer from "multer"


//set up storage for uploaded files
const storage= multer.diskStorage({
    destination: (req, file, setDest) => {
        
        setDest(null, 'uploads/');
    },
    filename: (req, file, setName) => {
      setName(null,file.originalname);
    }
  });


//Create our middleware function as specified storage and limit size to 5 MB
const upload = multer({storage, limits: {fileSize: 5 * 1024 * 1024}});



const uploadMultipleFiles=upload.array('files', 5)


export { uploadMultipleFiles }
