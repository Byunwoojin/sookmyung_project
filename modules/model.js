const tf = require("@tensorflow/tfjs");
const tfnode = require("@tensorflow/tfjs-node");
const TeachableMachine = require("@sashido/teachablemachine-node");

const fs = require("fs");

const classifyImage = async (imagePath) => {
  // const model = await tf.loadLayersModel(
  //   "http://ec2-54-180-120-246.ap-northeast-2.compute.amazonaws.com/public/test/model.json"
  // );

  const model = new TeachableMachine({
    modelUrl: "https://teachablemachine.withgoogle.com/models/Hahgv9OBr/",
  });

  function processImage(path) {
    let image = [];
    const imageSize = 224;
    const imageBuffer = fs.readFileSync(path); // can also use the async readFile instead
    // get tensor out of the buffer
    image = tfnode.node.decodeImage(imageBuffer, 3);
    // dtype to float
    image = image.cast("float32");
    // resize the image
    image = tf.image.resizeBilinear(image, (size = [imageSize, imageSize])); // can also use tf.image.resizeNearestNeighbor
    image = image.expandDims(); // to add the most left axis of size 1
    console.log(image.shape);
    console.log(image);
    return image;
  }

  const getAnalysis = async (image) => {
    console.log(image);
    const link = `https://catch-back.herokuapp.com/${image}`;
    console.log(link);
    let results = await model
      .classify({
        imageUrl: link,
      })
      .then((predictions) => {
        console.log("Predictions:", predictions);
        return predictions;
      })
      .catch((e) => {
        console.log("ERROR", e);
        return [];
      });
    console.log(results);

    const analysis_reesult = results
      .map((item, idx) => ({
        label: item.class,
        value: item.score,
      }))
      .sort((a, b) => b.value - a.value);
    console.log(analysis_reesult);
    return analysis_reesult;
  };

  let tensor_image = await processImage(imagePath);

  const analysis_reesult = await getAnalysis(imagePath);
  console.log(analysis_reesult);
  return analysis_reesult;
};

module.exports = classifyImage;
