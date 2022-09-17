const express = require("express");

const router = express.Router();
const { spawn } = require("child_process");

// GET / 라우터
router.get("/", (req, res) => {
  res.send("Hello Express");
  const analysis = spawn("python", ["mode.py", "카레유", "20"]);

  analysis.stdout.on("data", (result) => {
    console.log(result.toString());
    return res.json({
      data: result.toString(),
    });
  });
});
module.exports = router;
