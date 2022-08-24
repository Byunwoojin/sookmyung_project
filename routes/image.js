const express = require('express');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const Table = require('../models');

const router = express.Router();

// GET /image/:id 라우터
router.get('/:id', async (req, res) => {
    //id, type, path 보내기

    const imageId = req.params.id;
    let result = null;
    try {
        const image = await Table.Result.findAll({
            attributes: ['id', 'path', 'type'],
            where: {
                id: imageId
            },
        }).then((image) => {
            result = image;
        });
        res.status(statusCode.OK).send(
            util.success(
                statusCode.OK,
                "image get success",
                { result }
            )
        );
    } catch (error) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(
                statusCode.BAD_REQUEST,
                "image get fail"
            ));
    }
});

module.exports = router;