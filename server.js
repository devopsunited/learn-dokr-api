const express = require("express")
const cors = require("cors")
require('dotenv').config()

// our controllers
const DockerCmdController = require("./controllers/docker-command-controller") 
const DockerBookmarkController = require("./controllers/docker-bookmark-controller") 

const server = express()
server.use(cors())

server.use("/cmd", DockerCmdController);
server.use("/bookmark", DockerBookmarkController);


PORT = process.env.PORT || 5533

server.listen(PORT, () => {
    console.log(
    `👍  learn-dokr-api is currently running\n🔗  it uses port: ${PORT}`)
})



