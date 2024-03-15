import multer from 'multer';
import SharpMulter from 'sharp-multer';

const image = SharpMulter({
    destination: function (req, file, cb) {
        cb(null, 'uploads/image');
    },
    imageOptions: {
        fileFormat: "png",
        quality: 50,
        resize: { width: 800, height: 500 },
    },
    useTimestamp: true,
    filename: (originalname, options, req) => {
        const uniqueId = Date.now().toString();
        const { fileFormat , resize } = options;
        return `image-${uniqueId}-${resize.width}x${resize.height}.${fileFormat}`;
    },
});


const avatar = SharpMulter({
    destination: function (req, file, cb) {
        cb(null, 'uploads/avatar');
    },
    imageOptions: {
        fileFormat: "png",
        quality: 50,
        resize: { width: 150, height: 150 },
    },
    useTimestamp: true,
    filename: (originalname, options, req) => {
        const uniqueId = Date.now().toString();
        const { fileFormat , resize } = options;
        return `avatar-${uniqueId}-${resize.width}x${resize.height}.${fileFormat}`;
    },
});

export const imageUpload = multer({ storage : image});
export const avatarUpload = multer({ storage : avatar});
