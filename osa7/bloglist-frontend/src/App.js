import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import User from './components/User'
import { initBlogs, createBlog } from './reducers/blogsReducer'
import { logout, checkIfLoggedIn } from './reducers/loginReducer'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import { Switch, Route, Link } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'

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

  const menuStyle = { padding: 5 }

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
      // eslint-disable-next-line react/no-unknown-property
      <div className="container">
        <Navbar style={{ 'marginBottom': 15 }} collapseOnSelect expand="lg" bg="dark" variant="light">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={menuStyle} to='/'>blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={menuStyle} to='/users'>users</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div style={{ 'color': 'white' }} >{user.name} logged in
            <Button style={{ 'marginLeft': 5 }} onClick={() => dispatch(logout())} >Logout</Button>
          </div>
        </Navbar>
        <Notification />
        <Switch>
          <Route path='/blogs/:id'>
            <Blog />
          </Route>
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
      </div >
    )
  }
}

export default App