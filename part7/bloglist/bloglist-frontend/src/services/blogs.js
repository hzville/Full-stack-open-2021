import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const postNewBlog = async (newBlogObj, token) => {
    const config = {
        headers: { Authorization: `bearer ${token}` },
    }
    const response = await axios.post(baseUrl, newBlogObj, config)
    return response.data
}

const putNewLike = async (newLikeObj, token) => {
    const config = {
        headers: { Authorization: `bearer ${token}` },
    }
    const putUrl = `${baseUrl}/${newLikeObj.id}`
    const response = await axios.put(putUrl, newLikeObj, config)
    return response.data
}

const putNewComment = async (newCommentObj) => {
    const putUrl = `${baseUrl}/${newCommentObj.id}/comments`
    const response = await axios.put(putUrl, newCommentObj)
    return response.data
}

const removeById = async (blogId, token) => {
    const config = {
        headers: { Authorization: `bearer ${token}` },
    }
    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    return response.data
}

export default { getAll, postNewBlog, putNewLike, putNewComment, removeById }
