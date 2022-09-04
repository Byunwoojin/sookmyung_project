const tf = require("@tensorflow/tfjs");
const tfnode = require("@tensorflow/tfjs-node");
const fs = require("fs");

const classifyImage = async (imagePath) => {
  const model = await tf.loadLayersModel(
    "http://localhost:3000/public/test/model.json"
  );

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
    let results = await model.predict(tensor_image).dataSync();
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

  let tensor_image = await processImage(imagePath);

  const analysis_reesult = await getAnalysis(tensor_image);
  console.log(analysis_reesult);
  return analysis_reesult[0].label;
};

module.exports = classifyImage;
