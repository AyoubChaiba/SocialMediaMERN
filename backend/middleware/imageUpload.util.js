import sharp from "sharp";

const imageUpload = async (req) => {
    const uniqueId = Date.now().toString();
    const fileExtension = req.file.mimetype;

    try {
        await sharp(req.file.buffer)
        .resize({with:800, height:600})
        .jpeg({quality: 80})
        .toFile(`uploads/images/${req.file.fieldname}-${uniqueId}.${fileExtension.split('/')['1']}`);
    } catch (error) {
        console.log(error);
    }
}

export default imageUpload