const jwt = require('jsonwebtoken')
const secret = process.env.JWTSECRET

const generateWebToken = (id) => {
    return jwt.sign({id}, secret, {
        expiresIn: '7d'
    })
}


module.exports = generateWebToken