import React, { useEffect } from 'react'
import HomeView from './components/HomeView'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import { sucessfulMessage, removeMessage } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setAllBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { Routes, Route, Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'

const App = () => {
    const dispatch = useDispatch()
    const loggedUser = useSelector(state => state.user)

    useEffect(() => {
        dispatch(setAllBlogs())
    },[dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
        }
    }, [])

    const logOut = () => {
        window.localStorage.removeItem('loggedUser')
        dispatch(setUser(null))
        dispatch(sucessfulMessage('Logout successful'))
        setTimeout(() => dispatch(removeMessage()), 5000)
    }

    return (
        <div className='container'>
            <Navbar className='nav-bar' collapseOnSelect >
                <Nav.Link href="#" as="span" >
                    <Link className='navbar-link-color' to='/'>home</Link>
                </Nav.Link>
                <Nav.Link href='#' as='span'>
                    <Link className='navbar-link-color' to='/'>blogs</Link>
                </Nav.Link>
                <Nav.Link href='#' as='span'>
                    <Link className='navbar-link-color' to='/users'>users</Link>
                </Nav.Link>
                {loggedUser != null ? <div>{loggedUser.username} logged in <button onClick={logOut}>logout</button> </div> 
                : ''}
            </Navbar>

            <Routes>
                <Route path='/' element={ <HomeView/> } />
                <Route path='/users' element={ <Users/> } />
                <Route path='/users/:id' element={ <User/> } />
                <Route path='/blogs/:id' element={ <BlogView/> } />
            </Routes>
        </div>
    )
}

export default App
