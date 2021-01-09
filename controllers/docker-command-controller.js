const router = require("express").Router();
const command = require("../utils/command");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const bookmarksPath = path.join(__dirname, "../bookmarks.json");

/* fs.readFile(bookmarksPath, async function (err, data) {
  const json = JSON.parse(data);

  if (json.length)
    json.forEach((bookmark) => {

      router.get("/" + bookmark.cmd.replace(" ", ""), async (req, res) => {
        console.log("hit /console bookmarked command");

        const message = await command(`docker ${bookmark.cmd}`);
        res.json(JSON.stringify(message));
      });

    });
}); */

router.post("/console", async (req, res) => {
  console.log("hit /console");

  const cmd = req.body.cmd;
  const message = await command(`docker ${cmd}`);

  res.json(JSON.stringify(message));
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
