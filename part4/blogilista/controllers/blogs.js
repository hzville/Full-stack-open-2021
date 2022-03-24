const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name : 1})
    response.json(blogs)
})
    
blogsRouter.post('/', userExtractor, async (request, response) => {
    if(!request.body.title || !request.body.url){
        return response.status(400).json({
            error: 'title or url missing'
        })
    }
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const newBlog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: request.user.id
    })
    const savedBlog = await newBlog.save()
    request.user.blogs = request.user.blogs.concat(savedBlog.id)
    await request.user.save()
    response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

    if (!token || !decodedToken.id){
        return response.status(401).json({error: 'token missing or invalid'})
    }
    
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === decodedToken.id){
        await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end()
    } else {
        return response.status(401).json({error: 'user not matching blog'})
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const updateBlog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }
    await Blog.findByIdAndUpdate(request.params.id, updateBlog, { new : true })
    response.json(updateBlog)
})

module.exports = blogsRouter