import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Login from './components/Login'
import User from './components/User'
import { initBlogs, createBlog } from './reducers/blogsReducer'
import { logout, checkIfLoggedIn } from './reducers/loginReducer'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import { Switch, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(checkIfLoggedIn())
  }, [dispatch])

  const user = useSelector(state => state.user)

  const handleCreateBlog = (blog) => {
    blogFormRef.current.toggle()
    dispatch(createBlog(blog))
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <Login />
      </div>
    )
  }
  else {
    return (
      <div>
        <Notification />
        <h2>Blogs</h2>
        <p>{user.name} logged in <button onClick={() => dispatch(logout())} >Logout</button></p>
        <Switch>
          <Route path='/users/:id'>
            <User />
          </Route>
          <Route path='/users'>
            <UserList />
          </Route>
          <Route path='/'>

            <Togglable buttonLabel={'Add new'} ref={blogFormRef}>
              <BlogForm userId={user.id} createBlog={handleCreateBlog} />
            </Togglable>
            <BlogList />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App