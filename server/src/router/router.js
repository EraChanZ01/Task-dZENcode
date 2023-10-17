const express = require('express')
const commentRouter = require('./commentRouter')

const router = express.Router()

router.use('/comment', commentRouter)

module.exports = router