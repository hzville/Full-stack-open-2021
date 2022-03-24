import React, { useRef } from 'react'
import Viewable from './Viewable'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = ({ blog, addNewLike, handleRemove }) => {
    const viewFormRef = useRef()
    const user = useSelector(state => state.user)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const addLike = async () => {
        try {
            addNewLike({
                id: blog.id,
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes + 1,
            })
        } catch (error){
            console.log('error adding like', error)
        }
    }

    const removeBlog = (event) => {
        event.preventDefault()
        try {
            if (window.confirm(`You are about to remove blog ${blog.title}`)) {
                handleRemove(blog.id)
            }
        } catch {
            console.log('error removing blog')
        }
    }

    const showRemove = user.username === blog.user.username

    return (
        <div style={blogStyle}>
            <Link to={`blogs/${blog.id}`}>{blog.title}</Link> <br />
            {blog.author}
            <Viewable buttonLabel="view" ref={viewFormRef}>
                <div>
                    {blog.url} <br />
                    likes: {blog.likes}
                    <button onClick={addLike} className='blog-general-button'>like</button> <br />
                    {showRemove ? <button onClick={removeBlog} id="removeBlogButton" className='blog-general-button'>remove</button> : ''}
                </div>
            </Viewable>
        </div>
    )
}

export default Blog
