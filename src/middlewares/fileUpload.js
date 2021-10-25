const multer = require('multer');
const path = require('path');

exports.fileUpload = multer({
    destination : (req, file, cb) => {
        try{
            cb(null, 'uploads/')
        }catch(err){
            res.send(err)
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
    limits:{
        files: 1,
        fileSize: (1024 * 1024)
    }
}).array('files')