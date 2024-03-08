import fse from "fs-extra"
import path from "path"
import zip from "express-zip"
//import archiver from "archiver"

async function listFiles(req,res)  {
    const folderPath='./data/';
    const data=await fse.readdir(folderPath,'utf8')
    
    res.render('index',{files:data});
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
    try {
        await fse.unlink(filePath);
        res.status(200).send("was successfully deleted")
        // res.render("results/success",{fileName:fileName, message:"was successfully deleted"})
      } catch (err) {
        console.error(err);
        res.status(500).send('Failed to delete the file');
      }
    
}

const UpdateFileName = async (req,res) => {
    console.log("I want to update")

    const currentName=req.params.filename;
    const newFileName=req.body.newFileName;
    console.log("oldname:",currentName)
    console.log("newname:",newFileName)
     if(!newFileName) {
        return res.status(400).send('Missing new filename');
     }

    const oldFilePath = path.join('data', currentName);
    const newFilePath = path.join('data', newFileName);

    // Check if the file exists
    fse.access(oldFilePath, fse.constants.F_OK, (err) => {
        if (err) {
            console.log("here the error")
            return res.status(404).send('File not found');
        }
         // Rename the file
         fse.rename(oldFilePath, newFilePath, (err) => {
            if (err) {
                console.log("here the error")
                return res.status(500).send('Error updating file name');
            }

            res.send('File name updated successfully');
        });
    });
}

const showUploadForm = async (req,res) => {

    const filePath='./data/';;
    const uploadedFiles=await fse.readdir(filePath,'utf8')
    
    
    res.render('upload',{uploadedFiles:uploadedFiles});

}

const uploadNewFile = (req,res) => {
        
        try {
            console.log(req.files)
            res.redirect('/');
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

    const filePath = path.join('data', fileName);
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

    const filePath=path.join("data");
    //sets the compression level
    const downloads=[]
    fse.readdir(filePath,'utf8')
    .then(data => {
        data.forEach((file)=> {
            const filePath=path.join("data/"+file);
            downloads.push({path:filePath,  name: file });
        })
        res.zip(downloads,'files.zip')
    })
    .catch(err => {
    console.error(err);
    });
  }

  const searchFiles = async (req,res) => {

    const searchVal=req.query.q;
    const searchResults=[];
    const folderPath='./data/';

    try {
        const data=await fse.readdir(folderPath,'utf8')
        data.forEach((file) => {
            if(file.includes(searchVal)) {
                searchResults.push(file)
            }
        })

        if(searchResults.length<1) {
            res.json({message:"There are no results matching the input name"})
        }
        
        res.json(searchResults);
        
        
    } catch(err) {
        console.log(err)
    }

  }

export { listFiles,
         showCreateForm,
         showFileDetails, 
         createNewFile,  
         deleteFile, 
         UpdateFileName,  
         showUploadForm,
         uploadNewFile,
         downloadFile,
         downloadAllFiles,
         searchFiles
        }

