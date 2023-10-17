const express = require('express')
const commentController = require('../controllers/commentController')
const checkText = require('../middleware/checkTextInComment')
const upload = require('../utils/fileUpload')


const commentRouter = express.Router()

commentRouter.post('/', upload.uploadFiles, checkText.checkSequence, checkText.replaceBBCode, commentController.createComment)

module.exports = commentRouter