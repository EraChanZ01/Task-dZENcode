const fs = require('fs');
const path = require('path');
const multer = require('multer');
const env = process.env.NODE_ENV || 'development';

const devFilePath = path.resolve(__dirname, '..', '..', 'public/fileMessages');


const filePath = env === 'production'
    ? '/var/www/html/fileMessages/'
    : devFilePath;

if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, {
        recursive: true,
    });
}

const storageFiles = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, filePath);
    },
    filename(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const imageFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/gif', 'image/png', 'text/plain'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file format'), false);
    }
};

const uploadFile = multer({ storage: storageFiles, fileFilter: imageFilter })

module.exports.uploadFiles = async (req, res, next) => {
    try {
        uploadFile.fields([
            { name: 'image', maxCount: 1 },
            { name: 'textFile', maxCount: 1 }
        ])(req, res, (err) => {
            if (err) {
                throw new Error('Invalid file')
            }
            if (req.files['textFile'][0].size > 100 * 1024) {
                throw new Error('file size exceeds the limit')
            }
            next()
        })
    } catch (e) {
        return next(e)
    }

}