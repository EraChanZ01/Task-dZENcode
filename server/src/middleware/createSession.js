const jwt = require('jsonwebtoken')
const config = require('../config')
const { promisify } = require('util')

const jwtSign = promisify(jwt.sign)


module.exports.verefyToken = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization
        if (accessToken) {
            throw 'not accessToken'
        }
        req.tokenData = await jwt.verify(accessToken, config.token.SECRET)
        next()
    } catch (e) {
        next(new Error(' Bed token '))
    }
}

module.exports.createdToken = async (data) => await jwtSign(data, config.token.SECRET, { expiresIn: config.token.EXPIRES_TIME })
