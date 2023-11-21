import multer from "multer";
import { cwd } from "process";

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

export const upload = multer({
    storage: multer.diskStorage({
        destination: cwd() + '/public/uploads',
        filename: (req, file, cb) => {
            let ext = MIME_TYPE_MAP[file.mimetype];
            let name = Date.now() + '.' + ext;
            cb(null, name);
        }
    })
});