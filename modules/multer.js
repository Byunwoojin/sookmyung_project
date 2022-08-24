const multer = require("multer");
const path = require("path");

const uploadImage = multer({
  storage: multer.diskStorage({
    destination(req, file, done) { //파일 저장 위치
      done(null, 'public/uploads');
    },
    filename(req, file, done) {
      // 파일명 + 현재시간.확장자 = 전체 파일명
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      //done(null, 'uploadImage' + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, //5MB로 제한
});

module.exports = { uploadImage }