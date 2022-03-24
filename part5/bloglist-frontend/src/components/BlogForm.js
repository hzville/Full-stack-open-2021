import React, { useState } from 'react'

const BlogForm = ({
    createNewBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addNewBlog = (event) => {
        event.preventDefault()
        try {
            createNewBlog({
                title: title,
                author: author,
                url: url
            })
            setTitle('')
            setAuthor('')
            setUrl('')

        } catch (expection) {
            console.log('error creating blog')
        }
    }

    return (
        <div>
            <h2>Create new blog</h2>

            <form onSubmit={addNewBlog}>
                <div>title: <input type='text' value={title} name='blogTitle' onChange={({ target }) =>  setTitle(target.value)}></input></div>
                <div>author: <input type='text' value={author} name='blogAuthor' onChange={({ target }) => setAuthor(target.value)}></input></div>
                <div>url: <input type='text' value={url} name='blogurl' onChange={({ target }) => setUrl(target.value)}></input></div>
                <button type='submit' id='createNewBlogButton'>Create</button>
            </form>

        </div>
    )
}

export default BlogForm