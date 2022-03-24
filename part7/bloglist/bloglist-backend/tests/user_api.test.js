const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const testData = require('./test_data/test_data_user')
const api_contorllers = require('./api_controllers/api_controllers_user')
const bcrypt = require('bcrypt')
const saltRounds = 10

beforeEach(async () => {
    await User.deleteMany({})

    testData.listWithManyUsers.forEach(
        async (user) =>
            (user.password = await bcrypt.hash(user.password, saltRounds))
    )
    await User.insertMany(testData.listWithManyUsers)
})

describe('users GET test ', () => {
    test('users are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct amount of users are returned', async () => {
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(testData.listWithManyUsers.length)
    })
})

describe('users creation POST test', () => {
    test('user can be added to db with POST', async () => {
        const newUser = {
            username: 'test_new_user',
            name: 'test new user',
            password: 'testpassword',
        }
        const result = await api.post('/api/users').send(newUser).expect(201)
        const response = await api_contorllers.getAllUsersFromDb()
        expect(response).toHaveLength(testData.listWithManyUsers.length + 1)
        const usernames = response.map((user) => user.username)
        expect(usernames).toContain('test_new_user')
    })

    test('user is not added if username is missing', async () => {
        const newUser = {
            name: 'test name ',
            password: 'testpassword',
        }
        const response = await api.post('/api/users').send(newUser)
        const usersInDb = await api_contorllers.getAllUsersFromDb()
        expect(response.statusCode).toEqual(400)
        expect(response.body).toContain(
            'error: username or password is missing'
        )
        expect(usersInDb.length).toEqual(testData.listWithManyUsers.length)
    })

    test('user is not added if username length is under 3', async () => {
        const newUser = {
            username: 'ab',
            name: 'test name',
            password: 'testpassword',
        }
        const response = await api.post('/api/users').send(newUser)
        const usersInDb = await api_contorllers.getAllUsersFromDb()
        expect(response.statusCode).toEqual(400)
        expect(JSON.stringify(response.body)).toMatch(/minimum allowed length/)
        expect(usersInDb.length).toEqual(testData.listWithManyUsers.length)
    })

    test('user is not added if password is missing', async () => {
        const newUser = {
            username: 'test username',
            name: 'test name',
        }
        const response = await api.post('/api/users').send(newUser)
        const usersInDb = await api_contorllers.getAllUsersFromDb()
        expect(response.statusCode).toEqual(400)
        expect(response.body).toContain(
            'error: username or password is missing'
        )
        expect(usersInDb.length).toEqual(testData.listWithManyUsers.length)
    })

    test('user is not added if password length is under 3', async () => {
        const newUser = {
            username: 'test username',
            name: 'test name',
            password: 'ab',
        }
        const response = await api.post('/api/users').send(newUser)
        const usersInDb = await api_contorllers.getAllUsersFromDb()
        expect(response.statusCode).toEqual(400)
        expect(JSON.stringify(response.body)).toMatch(
            /error: password must be 3 char or longer/
        )
        expect(usersInDb.length).toEqual(testData.listWithManyUsers.length)
    })

    test('user can be create if username is unique', async () => {
        const newUser = {
            username: 'unique user',
            name: 'unique name',
            password: 'abc123',
        }
        await api.post('/api/users').send(newUser).expect(201)
        const duplicateUser = {
            username: 'unique user',
            name: 'unique name',
            password: 'abc123',
        }
        const response = await api.post('/api/users').send(duplicateUser)
        const usersInDb = await api_contorllers.getAllUsersFromDb()
        expect(response.statusCode).toEqual(400)
        expect(JSON.stringify(response.body)).toMatch(
            /Error, expected `username` to be unique./
        )
        expect(usersInDb.length).toEqual(testData.listWithManyUsers.length + 1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
