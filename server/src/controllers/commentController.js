const db = require('../models')

module.exports.createComment = async (req, res, next) => {
    try {
        const { validText, userName, email, parentCommentId } = req.body
        const { image, textFile } = req.files
        console.log(image, textFile)
        const newData = {
            userName,
            email,
            text: validText,
            parentCommentId,
            imageName: image[0].filename,
            fileTextName: textFile[0].filename
        }
        const comment = await db.Comments.create(newData)
        res.status(201).send(comment)
    } catch (e) {
        console.log(e)
        res.status(500).send('Failed Fetch')
    }

}