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
      <ul>
        {
          users.map(user => {
            return (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link> {user.blogs.length}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default UserList