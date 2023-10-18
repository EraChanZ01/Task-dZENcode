const yup = require('yup');

module.exports.commentSchem = yup.object().shape({
    userName: yup.string().required().min(1),
    email: yup.string().required().min(1),
    text: yup.string().required().min(1),
    parentCommentId: yup.number().nullable(),
    homePage: yup.string().nullable()
})