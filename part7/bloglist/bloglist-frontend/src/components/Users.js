import { useEffect, useState } from "react"
import userService from '../services/users'
import { Link } from "react-router-dom"

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getAllUsers = async () => {
            const users = await userService.getAll()
            setUsers(users.sort((a, b) => {
                return b.blogs.length - a.blogs.length
            }))
        }
        getAllUsers()
    },[])


    return (
            <div>
                <h2>Users</h2>
                <table>
                    <tbody>
                        <tr><th> username </th><th> blogs </th></tr>
                        {users.map(user => {
                            return(
                                <tr key={user.username}>
                                    <td><Link to={`${user.id}`}>{user.username}</Link></td><td>{user.blogs.length}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
    )
}

export default Users