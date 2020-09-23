import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  return (
    <div>
      <h3>Users</h3>
      <Table striped><thead>
        <tr><th>Name</th><th>Blogs</th></tr></thead><tbody>
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
      </Table>
    </div>
  )
}

export default UserList