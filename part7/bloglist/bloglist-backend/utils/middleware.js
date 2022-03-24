const User = require('../models/user')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

const unknowEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'invalid id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' })
    }
    next(error)
}

const getTokenFrom = (request, response, next) => {
    const auth = request.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        request.token = auth.substring(7)
    }
    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_SECRET)
    request.user = await User.findById(decodedToken.id)
    next()
}

module.exports = {
    unknowEndpoint,
    errorHandler,
    getTokenFrom,
    userExtractor,
}
