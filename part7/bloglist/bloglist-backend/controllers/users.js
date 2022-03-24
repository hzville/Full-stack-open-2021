const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { user: 0 })
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id).populate('blogs', {
        user: 0,
    })
    response.json(user)
})

usersRouter.post('/', async (request, response) => {
    if (!request.body.username || !request.body.password) {
        return response
            .status(400)
            .json('error: username or password is missing')
    } else if (request.body.password.length < 3) {
        return response
            .status(400)
            .json('error: password must be 3 char or longer')
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(request.body.password, saltRounds)

    const newUser = new User({
        username: request.body.username,
        name: request.body.name,
        password: hashedPassword,
        blogs: request.body.blogs,
    })
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter
