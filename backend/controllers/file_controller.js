import fse from "fs-extra"
import path from "path"
import zip from "express-zip"
//import archiver from "archiver"

async function listFiles(req,res)  {
    const folderPath='./data/';
    const folderUploadsPath='./uploads/';;
    const data=await fse.readdir(folderPath,'utf8')
    const uploadedFiles=await fse.readdir(folderUploadsPath,'utf8')
    
    res.render('index',{files:data,uploadedFiles:uploadedFiles});
}

const showCreateForm = (req,res) => {

    const fileName=req.params.filename;
    console.log(fileName)
    res.render('create',{fileName:fileName});
}

const showFileDetails = async (req,res) => {
    
    const name=req.params.filename
    const filePath=path.join("data",name);
    fse.readFile(filePath,'utf8')
    .then(data => {
        const content=data;
        res.render('detail',{name:name,content:content});
    })
    .catch(err => {
    console.error(err);
    });
    
}

const showUploadFile = async (req,res) => {
    
    const name=req.params.filename
    const filePath=path.join("uploads",name)
    fse.readFile(filePath,'utf8')
    .then(data => {
        const content=data;
        res.render('detail',{name:name,content:content});
    })
    .catch(err => {
    console.error(err);
    });
    
}

const createNewFile = (req,res) => {
    console.log(req.body);
    const fileName=req.body.name;
    const fileContent=req.body.content;
    const filePath=path.join("data",fileName)
    fse.writeFile(filePath,fileContent)
    .then( () => {
        // res.render("results/success",{fileName:fileName, fileContent:fileContent,message:"was successfully created",create:true})
        res.redirect('/')    
    }
    )
    .catch((err) => {
        console.error(err);
    })

}

const deleteFile = async (req,res) => {
    console.log(req)
    const fileName=req.params.filename;
    console.log("file name is",fileName)
    const filePath=path.join("data",fileName);
    console.log("check if file exist:",fileExist)
    console.log(filePath)
    try {
        await fse.unlink(filePath);
        res.render("results/success",{fileName:fileName, message:"was successfully deleted",create:false})
      } catch (err) {
        console.error(err);
        res.status(500).send('Failed to delete the file');
      }
    
}

const UpdateFile = async (req,res) => {

    const fileName=req.params.filename;
    console.log("file name is",fileName)
    const filePath=path.join("data",fileName);
    console.log(filePath)
    try {
        await fse.unlink(filePath);
        res.render("results/success",{fileName:fileName, message:"was successfully deleted",create:false})
      } catch (err) {
        console.error(err);
        res.status(500).send('Failed to delete the file');
      }
    
}

const showUploadForm = async (req,res) => {

    const filePath='./uploads/';;
    const uploadedFiles=await fse.readdir(filePath,'utf8')
    
    
    res.render('upload',{uploadedFiles:uploadedFiles});

}

const uploadNewFile = (req,res) => {
        
        try {
            console.log(req.files)
            res.json({ message: 'File uploaded successfully!' });
        } catch (err) {
            console.log("here")
            console.error(err);
            res.status(400).send(err.message);
          }      
}

const downloadFile = async (req,res) => {
    
    const fileName = req.params.filename;
    if(!fileName) {
        return res.status(400).send('Filename is not found');
    }

    const filePath = path.join('uploads', fileName);
    res.download(filePath, fileName, (err) => {
        if(err) {
            console.log(err)
        }
    });
    // try {
    //     // Check if the file exists
    //     await fse.access(filePath, fse.constants.F_OK)
    // } catch(err) {
    //     return res.status(404).send('File not found');
    //   }
  
    // // Stream the file to the client
    // const fileStream = fse.createReadStream(filePath);
    // fileStream.pipe(res);
  }

  const downloadAllFiles = (req,res) => {

    const filePath=path.join("uploads");
    //sets the compression level
    const downloads=[]
    fse.readdir(filePath,'utf8')
    .then(data => {
        data.forEach((file)=> {
            const filePath=path.join("uploads/"+file);
            downloads.push({path:filePath,  name: file });
        })
        res.zip(downloads,'files.zip')
    })
    .catch(err => {
    console.error(err);
    });
  }

  const searchFiles = (req,res) => {

    console.log(req.query.q);
    const searchVal=req.query.q;
    console.log(req.query.q);
    const searchResults=[];
    fse.readdir("data",'utf8')
    .then(data => {
        data.forEach((file)=> {
            if(file.includes(searchVal)) {
                searchResults.push(file)
            }
        })
        console.log(searchResults)
        res.json(searchResults)
    })
    .catch(err => {
        res.status(500).send('Error reading files');
    });
    
    // fse.readdir("uploads",'utf8')
    // .then(data => {
    //     data.forEach((file)=> {
    //         if(file.includes(searchVal)) {
    //              searchResults.push(file)
    //         }
    //     })
    //     console.log(searchResults)
    //     res.json(searchResults)
    // })
    //  .catch(err => {
    //     res.status(500).send('Error reading files');
    // });


  }

export { listFiles,
         showCreateForm,
         showFileDetails, 
         createNewFile,  
         deleteFile, 
         UpdateFile,  
         showUploadForm,
         uploadNewFile,
         showUploadFile,
         downloadFile,
         downloadAllFiles,
         searchFiles
        }

