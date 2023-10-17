const express = require('express')
const router = require('./router/router')

const app = express()

app.use(express.json())

app.use("/", router)

app.listen(3000, () => {
    console.log('Application listening on port 3000!');
})