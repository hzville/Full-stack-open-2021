import NotificationMessage from "./NotificationMessage"
import LoginForm from "./LoginForm"
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { sucessfulMessage, errorMessage, removeMessage } from '../reducers/notificationReducer'
import { setAllBlogs } from '../reducers/blogsReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'


const HomeView = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const blogFormRef = useRef()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            dispatch(setUser(user))
            setUsername('')
            setPassword('')
            dispatch(sucessfulMessage('Login successful'))
            setTimeout(() => dispatch(removeMessage()), 5000)
        } catch (exception) {
            dispatch(errorMessage('Invalid username or password'))
            setTimeout(() => dispatch(removeMessage()), 5000)
        }
    }

    const logOut = () => {
        window.localStorage.removeItem('loggedUser')
        dispatch(setUser(null))
        dispatch(sucessfulMessage('Logout successful'))
        setTimeout(() => dispatch(removeMessage()), 5000)
    }

    const createNewBlog = async (newBlogObj) => {
        blogFormRef.current.toggleVisibility()
        try {
            await blogService.postNewBlog(newBlogObj, user.token)
            dispatch(setAllBlogs())
            dispatch(sucessfulMessage('Blog added sucessfully'))
            setTimeout(() => dispatch(removeMessage()), 5000)

        } catch (expection) {
            console.log('error creating new blog', expection)
            dispatch(errorMessage('Error creating new blog', expection))
            setTimeout(() => dispatch(removeMessage()), 5000)
        }
    }

    if (user === null) {
        return (
            <div className='homeview'>
                <NotificationMessage />

                <LoginForm
                    username={username}
                    password={password}
                    handleSubmit={handleLogin}
                    handleUsernameChange={({ target }) =>
                        setUsername(target.value)
                    }
                    handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                    }
                />
            </div>
        )
    }

    return (
        <div>
            <NotificationMessage />
            <Togglable buttonLabel="create new blog" ref={blogFormRef} >
                <BlogForm createNewBlog={createNewBlog} />
            </Togglable>
            <BlogList />
        </div>
    )
}

export default HomeView