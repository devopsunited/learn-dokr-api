const router = require("express").Router();
const command = require("../utils/command-with-columns");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const bookmarksPath = path.join(__dirname, "../bookmarks.json");

router.use(bodyParser.json())

router.post("/console", async (req, res) => {
  
  const cmd = req.body.cmd;
  const message = await command(`docker ${cmd}`);

  res.json(message);
});

router.get("/bookmark/:cmd", (req, res) => {
  
  fs.readFile(bookmarksPath, async function (err, data) {
    const json = JSON.parse(data);
    const bookmark = json.filter((bookmark) => bookmark.cmd === req.params.cmd)

    const message = await command(`docker ${bookmark[0].cmd}`);
    res.json(message);
  });
});

module.exports = router;
