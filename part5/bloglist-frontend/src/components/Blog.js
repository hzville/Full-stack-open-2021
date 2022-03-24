import React, { useRef } from 'react'
import Viewable from './Viewable'

const Blog = ({ blog, addNewLike, handleRemove }) => {

    const viewFormRef = useRef()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const addLike = (event) => {
        event.preventDefault()
        try{
            addNewLike({
                id: blog.id,
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes +1
            })
        } catch {
            console.log('error adding like')
        }
    }

    const removeBlog = (event) => {
        event.preventDefault()
        try {
            if(window.confirm(`You are about to remove blog ${blog.title}`)) {
                handleRemove(blog.id)
            }
        } catch {
            console.log('error removing blog')
        }
    }


    const showRemove = JSON.parse(window.localStorage.getItem('loggedUser')).username === blog.user.username

    return(
        <div style={blogStyle}>
            {blog.title} <br/>
            {blog.author}
            <Viewable buttonLabel='view' ref={viewFormRef}>
                <div>
                    {blog.url} <br/>
                    likes: {blog.likes}
                    <button onClick={addLike}>like</button> <br/>
                    {showRemove ? <button onClick={removeBlog} id='removeBlogButton'>remove</button> : ''}
                </div>
            </Viewable>
        </div>
    )}

export default Blog