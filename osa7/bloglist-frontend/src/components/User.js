import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

const User = () => {

  const users = useSelector(state => state.users)

  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(u => u.id === match.params.id)
    : null

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {
          user.blogs.map(blog => {
            return (
              <li key={blog.id}>{blog.title}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default User