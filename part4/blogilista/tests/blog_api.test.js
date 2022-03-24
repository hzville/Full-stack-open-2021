const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testData = require('./test_data/test_data_blog')
const userTestData = require('./test_data/test_data_user')
const api_contorllers = require('./api_controllers/api_controllers_blog')
const jwt = require('jsonwebtoken')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testData.listWith6blogs)
})

describe('blog tests ', () => {
    
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct amount of blogs is returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(testData.listWith6blogs.length)
    })

    test('blog object _id is defined id', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(post => {
            expect(post._id).not.toBeDefined()
            expect(post.id).toBeDefined()
        })
    })

    test('blog can be added to db with POST', async () => {
    
        const newBlog = ({
            title:'test new blog post',
            author:'test new author',
            url:'test.test.test',
            likes:'99'
        })

        const addingUser = {
            username: userTestData.listWithManyUsers[0].username, 
            id: userTestData.listWithManyUsers[0]._id
        }

        let token = 'bearer '
        token += jwt.sign(addingUser, process.env.TOKEN_SECRET)

        await api.post('/api/blogs').set('Authorization', token).send(newBlog)
        const response = await api_contorllers.getAllBlogsFromDb()
        expect(response).toHaveLength(testData.listWith6blogs.length +1)
        const content = response.map(blog => blog.title)
        expect(content).toContain('test new blog post')
    })

    test('blog likes is set to 0 if undefined', async () => {
        const newBlog = ({
            title:'blog with zero likes',
            author:'zero',
            url:'zero.zero.zero',
            likes:''
        })

        const addingUser = {
            username: userTestData.listWithManyUsers[0].username, 
            id: userTestData.listWithManyUsers[0]._id
        }

        let token = 'bearer '
        token += jwt.sign(addingUser, process.env.TOKEN_SECRET)

        await api.post('/api/blogs').set('Authorization', token).send(newBlog)
        const response = await api_contorllers.getAllBlogsFromDb()
        const filterBlogs = response.filter(blog => blog.title === 'blog with zero likes')
        expect(filterBlogs[0].likes).toEqual(0)
    })

    test('blog not added if token missing', async () => {
        const newBlog = ({
            title:'missing token',
            author:'zero',
            url:'zero.zero.zero',
            likes:''
        })

        await api.post('/api/blogs').send(newBlog).expect(401)
        const response = await api_contorllers.getAllBlogsFromDb()
        expect(response).toHaveLength(testData.listWith6blogs.length)
    })

    test('blog not added if title missing', async () => {
        const newBlog = ({
            title:'',
            author:'zero',
            url:'zero.zero.zero',
            likes:''
        })
        await api.post('/api/blogs').send(newBlog).expect(401)
        const response = await api_contorllers.getAllBlogsFromDb()
        expect(response).toHaveLength(testData.listWith6blogs.length)
    })

    test('blog not added if url missing', async () => {
        const newBlog = ({
            title:'title',
            author:'zero',
            url:'',
            likes:''
        })
        await api.post('/api/blogs').send(newBlog).expect(401)
        const response = await api_contorllers.getAllBlogsFromDb()
        expect(response).toHaveLength(testData.listWith6blogs.length)
    })

    test('delete blog with id', async () => {    
        const newBlog = ({
            title:'delete this blog',
            author:'delete',
            url:'delete.delete.delete',
            likes:''
        })

        const addingUser = {
            username: userTestData.listWithManyUsers[0].username, 
            id: userTestData.listWithManyUsers[0]._id
        }

        let token = 'bearer '
        token += jwt.sign(addingUser, process.env.TOKEN_SECRET)
        const response = await api.post('/api/blogs').set('Authorization', token).send(newBlog).expect(201)
        expect(response.body.title).toContain('delete this blog')
        const blogs = await api_contorllers.getAllBlogsFromDb()
        expect(blogs).toHaveLength(testData.listWith6blogs.length + 1)
        await api.delete(`/api/blogs/${response.body.id}`).set('Authorization', token)
        const blogsAfterDelete = await api_contorllers.getAllBlogsFromDb()
        expect(blogsAfterDelete).toHaveLength(testData.listWith6blogs.length)
    })

    test('update blog with id', async () => {
        const blogs = await api_contorllers.getAllBlogsFromDb()
        const updateBlog = {
            title: blogs[0].title,
            author: blogs[0].author,
            url: blogs[0].url,
            likes: 9090909090
        }
        await api.put(`/api/blogs/${blogs[0].id}`).send(updateBlog)
        const blogsAfterUpdate = await api_contorllers.getAllBlogsFromDb()
        expect(blogsAfterUpdate[0].likes).toEqual(9090909090)
    })

})

afterAll(() => {
    mongoose.connection.close()
})