import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/public/uploads/');
  },
  filename: function (req, file, cb) {
    const name = replaceStringUnicode(file.originalname);

    cb(null, file.fieldname + '-' + Date.now() + '-' + name);
  },
});
const upload = multer({ storage: storage });

export function replaceStringUnicode(_string: string) {
  const newString = _string
    .replace(/ /g, '_')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return newString;
}

export default upload;
