import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const UserList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  return (
    <div>
      <h3>Users</h3>
      <table><thead>
        <tr><th></th><th>Blogs</th></tr></thead><tbody>
          {
            users.map(user => {
              return (
                <tr key={user.id}>
                  <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                  <td>{user.blogs.length}</td>
                </tr>
              )
            })
          }</tbody>
      </table>
    </div>
  )
}

export default UserList