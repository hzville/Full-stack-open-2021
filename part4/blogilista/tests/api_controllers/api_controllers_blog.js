const Blog = require('../../models/blog')

const getAllBlogsFromDb = async () => {
    const blogsToReturn = await Blog.find({})
    return blogsToReturn
}

module.exports = {
    getAllBlogsFromDb
}