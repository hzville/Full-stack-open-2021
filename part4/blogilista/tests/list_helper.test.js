const listHelper = require('../utils/list_helper')
const test_data = require('./test_data/test_data_blog')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('empty list likes is zero', () => {
        const result = listHelper.totalLikes(test_data.emptyList)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(test_data.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has many blogs equals the likes all likes', () => {
        const result  = listHelper.totalLikes(test_data.listWith6blogs)
        expect(result).toBe(36)
    })
    
})

describe('data inside blogs', () => {
        
    test('find most liked blog', () => {
        const result = listHelper.favoriteBlog(test_data.listWith6blogs)
        expect(result).toEqual({
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        })
    })
})