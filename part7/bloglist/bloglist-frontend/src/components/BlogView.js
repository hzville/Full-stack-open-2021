import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import blogService from '../services/blogs'
import { setAllBlogs } from '../reducers/blogsReducer'
import { sucessfulMessage, errorMessage, removeMessage } from '../reducers/notificationReducer'
import NotificationMessage from "./NotificationMessage"


const BlogView = () => {
    const id = useParams().id
    const blogs = useSelector(state => state.blogs)
    const blog = blogs.find(blog => blog.id === id)
    const user = useSelector(state => state.user)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const addNewLike = async () => {
        try {
            await blogService.putNewLike({ 
                id: blog.id,
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes + 1,}, user.token)
            dispatch(setAllBlogs())
        } catch (expection) {
            dispatch(errorMessage('Error adding like'))
            setTimeout(() => dispatch(removeMessage()), 5000)
        }
    }

    const addNewComment = async () => {
        try {
            await blogService.putNewComment({
                id: blog.id,
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes,
                comments: blog.comments.concat(comment)
            })
            setComment('')
            dispatch(setAllBlogs())
            dispatch(sucessfulMessage('new comment added'))
            setTimeout(() => dispatch(removeMessage()), 5000)
        } catch (expection) {
            console.log('error was ', expection)
        }
    }
    
    if (!blog) {
        return null
    }


    return (
        <div>
            <NotificationMessage />
            <h2>{blog.title}</h2>
            <a href={`https://${blog.url}`} rel="noreferrer" target="_blank" >{blog.url}</a>
            <br/>
            {blog.likes} likes 
            {user != null ? <button onClick={addNewLike}>like</button>:''} <br/>
            added by {blog.author}
            <h4>Comments</h4>
            {user != null ? <div><input type='text' value={comment} onChange={( { target }) => setComment(target.value)}></input>
            <button onClick={addNewComment}>add comment</button> </div>: ''}
            {blog.comments.map(comment => <li>{comment}</li>)}
        </div>
    )

}

export default BlogView