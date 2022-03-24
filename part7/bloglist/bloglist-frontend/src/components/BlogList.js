import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllBlogs } from '../reducers/blogsReducer'
import { errorMessage, removeMessage } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogList = () => {
    
    const blogs = useSelector(state => state.blogs).slice().sort((a, b) => {
        return b.likes - a.likes
    })
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(setAllBlogs)
    }, [dispatch])

    const addNewLike = async (newLikeObj) => {
        try {
            await blogService.putNewLike(newLikeObj, user.token)
            dispatch(setAllBlogs())
        } catch (expection) {
            dispatch(errorMessage('Error creating adding like'))
            setTimeout(() => dispatch(removeMessage()), 5000)
        }
    }

    const handleRemove = async (blogId) => {
        try {
            await blogService.removeById(blogId, user.token)
            dispatch(setAllBlogs())
        } catch (expection) {
            dispatch(errorMessage('Error removing blog'))
            setTimeout(() => dispatch(removeMessage()), 5000)
        }
    }
    

    return (
        <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    addNewLike={addNewLike}
                    handleRemove={handleRemove}
                />
            ))}
        </div>
    )
}

export default BlogList