const express = require('express');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const Table = require('../models');

const router = express.Router();

// GET /image 라우터
router.get('/', (req, res) => {
    //results table 모든 내용 조회
    const images = Table.Result.findAll({
    })
        .then((images) => {
            res.status(statusCode.OK).send(
                util.success(
                    statusCode.OK,
                    "image get success",
                    { images }
                )
            );
        })
        .catch((error) => {
            res.status(statusCode.BAD_REQUEST)
                .send(util.fail(
                    statusCode.BAD_REQUEST,
                    "image get fail"
                ));
        });
});

module.exports = router;