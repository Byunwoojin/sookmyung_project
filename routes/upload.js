const express = require('express');
const uploadMulter = require('../modules/multer');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');

const router = express.Router();

router.post('/', uploadMulter.uploadImage.single('image'), (req, res) => {

  if (req.body == undefined) return res.status(statusCode.BAD_REQUEST)
    .send(util.fail
      (
        statusCode.BAD_REQUEST,
        "필요한 값이 없습니다."
      )
    );

  if (req.body.image == '') return res.status(statusCode.BAD_REQUEST)
    .send(util.fail
      (
        statusCode.BAD_REQUEST,
        "image null"
      )
    );

  try {
    //파일을 py로 보내서 처리값 string을 body에 넣음
    res.status(statusCode.OK).send(
      util.success(
        statusCode.OK,
        "image post sucess",
        "리턴 쓰레기 종류 예정"
      )
    );
  } catch (error) {

  }

});

module.exports = router;
