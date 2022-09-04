const express = require("express");
const util = require("../modules/util");
const statusCode = require("../modules/statusCode");
const Table = require("../models");
const tf = require("@tensorflow/tfjs");
const tfnode = require("@tensorflow/tfjs-node");
const fs = require("fs");

const router = express.Router();

router.post("/", async (req, res) => {
  //id, type, path 보내기

  const model = await tf.loadLayersModel(
    "http://ec2-54-180-120-246.ap-northeast-2.compute.amazonaws.com/public/test/model.json"
  );
  console.log(req);
  console.log(req.body);
  if (req.body == undefined)
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, "필요한 값이 없습니다."));

  if (req.body.path == "")
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, "path null"));

  function processImage(path) {
    let image = [];
    const imageSize = 96;
    const imageBuffer = fs.readFileSync(path); // can also use the async readFile instead
    // get tensor out of the buffer
    image = tfnode.node.decodeImage(imageBuffer, 1);
    // dtype to float
    image = image.cast("float32");
    // resize the image
    image = tf.image.resizeBilinear(image, (size = [imageSize, imageSize])); // can also use tf.image.resizeNearestNeighbor
    image = image.expandDims(); // to add the most left axis of size 1
    console.log(image.shape);
    return image;
  }

  const getAnalysis = async (image) => {
    let results = await model.predict(tenwor_image).dataSync();
    const cateogry = [
      "Cardboard",
      "Glass",
      "Metal",
      "Paper",
      "Plastic",
      "Trash",
    ];
    const analysis_reesult = cateogry
      .map((item, idx) => ({
        label: item,
        value: results[idx],
      }))
      .sort((a, b) => b.value - a.value);
    return analysis_reesult;
  };

  let tenwor_image = await processImage(req.body.path);

  const analysis_reesult = await getAnalysis(tenwor_image);
  res.send(analysis_reesult);
});

module.exports = router;
