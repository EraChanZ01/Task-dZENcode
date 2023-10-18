const schems = require('../validationSchemes/shemes')

module.exports.validateCommentDate = async (req, res, next) => {
    const validationResult = await schems.commentSchem.isValid(req.body)
    if (!validationResult) {
        return next(new Error('Invalid data for Comment'));
    } else {
        next();
    }
}