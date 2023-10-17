const express = require('express')
const cors = require('cors');
const http = require('http');
const router = require('./router/router')
const socketController = require('./socketInit');

const app = express()

app.use(cors());
app.use(express.json())
app.use("/", router)

const server = http.createServer(app);

server.listen(3000,
    () => console.log('Application listening on port 3000!'));

socketController.createConnection(server)