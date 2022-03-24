import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users'

const User = () => {
    const [user, setUser] = useState(null)
    const id = useParams().id

    useEffect(() => {
        const findById = async () => {
            const foundUser = await userService.getById(id)
            setUser(foundUser)
        }
        findById()
    }, [])

    if (!user) {
        return null
    }
    return (
        <div>
            <h2>{user.username}</h2>
            <h3> added blogs </h3>
            {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </div>
    )
}

export default User