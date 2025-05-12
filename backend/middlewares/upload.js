import multer from 'multer';
import path from 'path'


const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    // console.log(file)
    // console.log(path.extname(file.originalname))
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB max
});

export default upload;
