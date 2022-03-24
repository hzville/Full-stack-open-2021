import React, { useState, useEffect, useRef } from 'react'
import ErrorMessage from './components/ErrorMessage'
import SuccessfulMessage from './components/SuccessfulMessage'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [successfulMessage, setSuccessfulMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const blogFormRef = useRef()

    blogs.sort((a,b) => {
        return b.likes-a.likes
    })

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
            setSuccessfulMessage('Login successful')
            setTimeout(() => setSuccessfulMessage(null), 5000)
        } catch (exception) {
            setErrorMessage('Invalid username or password')
            setTimeout(() => setErrorMessage(null), 5000)
        }
    }

    const createNewBlog = async (newBlogObj) => {
        blogFormRef.current.toggleVisibility()
        try {
            await blogService.postNewBlog(newBlogObj, user.token)
            setBlogs(await blogService.getAll())
            setSuccessfulMessage('Blog added successfully')
            setTimeout(() => setSuccessfulMessage(null), 5000)
        } catch (expection) {
            setErrorMessage('Error creating new blog')
            setTimeout(() => setErrorMessage(null), 5000)
        }
    }

    const blogList = () => (
        <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} addNewLike={addNewLike} handleRemove={handleRemove} />
            )}
        </div>
    )

    const addNewLike = async (newLikeObj) => {
        try{
            await blogService.putNewLike(newLikeObj, user.token)
            setBlogs(await blogService.getAll())
        } catch (expection) {
            setErrorMessage('Error creating adding like')
            setTimeout(() => setErrorMessage(null), 5000)
        }
    }

    const handleRemove = async (blogId) => {
        try{
            await blogService.removeById(blogId, user.token)
            setBlogs(await blogService.getAll())
        } catch (expection) {
            setErrorMessage('Error removing blog')
            setTimeout(() => setErrorMessage(null), 5000)
        }
    }

    const logOut = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
        setSuccessfulMessage('Logout successful')
        setTimeout(() => setSuccessfulMessage(null), 5000)
    }


    if (user === null){
        return (
            <div>
                <ErrorMessage message={errorMessage}/>
                <SuccessfulMessage message={successfulMessage} />

                <LoginForm
                    username={username}
                    password={password}
                    handleSubmit={handleLogin}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                />

            </div>
        )
    }

    return(
        <div>
            <p>Welcome {user.name}</p>
            <button onClick={() => logOut()}>Logout</button>
            <ErrorMessage message={errorMessage}/>
            <SuccessfulMessage message={successfulMessage} />
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm createNewBlog={createNewBlog} />
            </Togglable>

            {blogList()}
        </div>
    )

}

export default App