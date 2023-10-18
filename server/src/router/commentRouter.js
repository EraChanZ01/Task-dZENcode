const express = require('express')
const commentController = require('../controllers/commentController')
const checkText = require('../middleware/checkTextInComment')
const upload = require('../utils/fileUpload')
const validators = require('../middleware/validators')


const commentRouter = express.Router()

commentRouter.post('/send', upload.uploadFiles, validators.validateCommentDate, checkText.checkSequence, checkText.replaceBBCode, commentController.createComment)
commentRouter.get('/', commentController.getComment)
commentRouter.get('/:commentId', commentController.getReplies)

module.exports = commentRouter