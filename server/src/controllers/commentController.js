const db = require('../models')
const controller = require('../socketInit')

module.exports.createComment = async (req, res) => {
    try {
        const { validText, userName, email, parentCommentId } = req.body
        const { image, textFile } = req.files
        const newData = {
            userName,
            email,
            text: validText,
            parentCommentId,
            imageName: image ? image[0].filename : null,
            fileTextName: textFile ? textFile[0].filename : null
        }
        const comment = await db.Comments.create(newData)
        controller.getCommentController().emitNewComment(comment)
        res.status(201).send(comment)
    } catch (e) {
        res.status(500).send('Failed Fetch')
    }

}
module.exports.getComment = async (req, res) => {
    try {
        const { limit, offset } = req.query
        const comments = await db.Comments.findAll({
            order: [['createdAt', 'DESC']],
            where: {
                parentCommentId: null
            },
            include: [
                {
                    model: db.Comments,
                    as: 'replies',
                    order: [['createdAt', 'DESC']]
                }
            ],
            limit: limit,
            offset: offset
        })
        res.status(200).send(comments)
    } catch (e) {
        res.status(500).send('Failed Fetch')
    }
}
module.exports.getReplies = async (req, res) => {
    try {
        const { commentId } = req.params
        const { limit, offset } = req.query

        const replies = await db.Comments.findAll({
            where: {
                parentCommentId: commentId
            },
            include: [
                {
                    model: db.Comments,
                    as: 'replies',
                    order: [['createdAt', 'DESC']]
                }
            ],
            order: [['createdAt', 'DESC']],
            limit: limit,
            offset: offset
        })
        res.status(200).send(replies)
    } catch (e) {
        res.status(500).send('Failed Fetch')
    }
}