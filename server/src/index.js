const express = require('express')
const cors = require('cors');
const http = require('http');
const handlerError = require('./handlerError/handler')
const router = require('./router/router')
const socketController = require('./socketInit');

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors());
app.use(express.json())
app.use("/", router)
app.use(handlerError)

const server = http.createServer(app);

server.listen(PORT,
    () => console.log(`Application listening on port ${PORT}!`));

socketController.createConnection(server)