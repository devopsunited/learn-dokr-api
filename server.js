const command = require("./utils/command")
const express = require("express")
const cors = require("cors")

// our controllers
const DockerCmdController = require("./controllers/docker-command-controller") 
const DockerBookmarkController = require("./controllers/docker-bookmark-controller") 

cors();
const server = express();

server.use("/cmd", DockerCmdController);
server.use("/bookmark", DockerBookmarkController);


PORT = process.env.PORT || 3888
server.listen(PORT, () => {
    console.log(
    `👍  learn-dokr-api is currently running\n🔗  it uses port: ${PORT}`)
})



