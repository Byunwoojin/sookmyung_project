const express = require('express');
const uploadMulter = require('../modules/multer');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const Table = require('../models');

const router = express.Router();

router.post('/', uploadMulter.uploadImage.single('image'), async (req, res) => {

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
    const path = req.file.path;
    //파일을 py로 보내서 처리값 string을 받음
    const type = null;
    let imageId = null;
    const uploadImage = await Table.Result.create({
      path: path, type: type
    }).then((dbRes) => {
      imageId = dbRes.id;
    });
    res.status(statusCode.OK).send(
      util.success(
        statusCode.OK,
        "image post sucess",
        { imageId: imageId }
      )
    )
  } catch (error) {
    console.log(error);
    ErrorCaptureStackTrace(err);
    res.status(statusCode.DB_ERROR).send(
      util.fail(
        statusCode.DB_ERROR,
        "DB create error"
      )
    );
  }

});

module.exports = router;
