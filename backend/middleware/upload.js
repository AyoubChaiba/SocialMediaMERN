import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images');
    },
    filename: function (req, file, cb) {
        const uniqueId = Date.now().toString();
        const fileExtension = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueId}${fileExtension}`);
    },
});

const upload = multer({ storage: storage });

export default upload;
