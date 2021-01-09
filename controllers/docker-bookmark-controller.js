const router = require("express").Router();
const path = require("path");
const bookmarksPath = path.join(__dirname, "../bookmarks.json");
const command = require("../utils/command-with-columns");
const fs = require("fs");
const bodyParser = require("body-parser");
router.use(bodyParser.json());



router.post("/", (req, res) => {
  console.log("hit bookmark");

  const cmd = req.body.cmd;

  fs.readFile(bookmarksPath, async function (err, data) {
    const json = JSON.parse(data);

    const message = await command(`docker ${cmd}`);
    if (typeof message === "number" && message) {
      res.json({
        error: 1,
        message: "cannot bookmark a command returning an error",
      });
    } else {
      json.push({ cmd });
      fs.writeFile(bookmarksPath, JSON.stringify(json), function (err) {
        if (err) throw err;
      });
      res.json({
        error: 0,
        message: "A command has been saved in your bookmarks",
        command: `docker ${cmd}`,
      });
    }
  });
});

module.exports = router;
