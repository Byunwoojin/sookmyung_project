const tf = require("@tensorflow/tfjs");
const tfnode = require("@tensorflow/tfjs-node");
const fs = require("fs");

const classifyImage = async (imagePath) => {
  const model = await tf.loadLayersModel(
    "http://ec2-54-180-120-246.ap-northeast-2.compute.amazonaws.com/public/cnn_models/model.json"
  );

  function processImage(path) {
    let image = [];
    const imageSize = 299;
    const imageBuffer = fs.readFileSync(path); // can also use the async readFile instead
    // get tensor out of the buffer
    image = tfnode.node.decodeImage(imageBuffer, 3);
    // resize the image
    console.log("중간 이미지");
    console.log(image.dataSync());

    image = tf.image.resizeBilinear(image, (size = [imageSize, imageSize])); // can also use tf.image.resizeNearestNeighbor
    image = image.expandDims(); // to add the most left axis of size 1

    // dtype to float
    image = image.cast("float32").div(255);
    console.log(image.shape);
    return image;
  }

  const getAnalysis = async (tensor_image) => {
    let results = await model.predict(tensor_image).dataSync();
    console.log("결과");
    console.log(results);
    const cateogry = [
      "butan",
      "cardboard",
      "glass",
      "metal",
      "paper",
      "plastic",
      "plastic_bag",
      "trash",
    ];
    const analysis_reesult = cateogry
      .map((item, idx) => ({
        label: item,
        value: results[idx],
      }))
      .sort((a, b) => b.value - a.value);
    return analysis_reesult;
  };

  let tensor_image = await processImage(imagePath);

  const analysis_reesult = await getAnalysis(tensor_image);
  console.log("이미지");
  console.log(typeof tensor_image);
  return analysis_reesult;
};

module.exports = classifyImage;
