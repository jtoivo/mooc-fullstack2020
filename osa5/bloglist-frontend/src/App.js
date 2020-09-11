import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (text) => {
    setNotification(text)
    setNotificationType('info')
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }
  const showError = (text) => {
    setNotification(text)
    setNotificationType('error')
    setTimeout(() => {
      setNotification(null)
    }, 6000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (ex) {
      showError('Invalid username or password.')
    }
  }
  const logout = () => {
    window.localStorage.removeItem('blogAppUser')
    window.location.reload()
  }

  const addBlog = async (blogObject) => {
    try {
      const addedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(addedBlog))
      showNotification(`'${addedBlog.title}' added`)
      setBlogFormVisible(false)
    }
    catch (ex) {
      showError('Adding blog failed.')
    }
  }

  const handleLike = async (blog) => {
    try {
      const newBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: ++blog.likes,
        user: blog.user.id
      }
      await blogService.update(blog.id, newBlog)
      setBlogs(blogs.map(b => b.id === blog.id ? blog : b).sort((a, b) => b.likes - a.likes))
    }
    catch (ex) {
      showError('Adding a like failed.')
    }
  }

  const handleRemove = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
    catch (ex) {
      showError('Removing the blog failed.')
    }
  }

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  if (user === null) {
    return (
      <div>
        <Notification message={notification} type={notificationType} />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </div>
    )
  }
  else {
    return (
      <div>
        <Notification message={notification} type={notificationType} />
        <h2>Blogs</h2>
        <p>{user.name} logged in <button onClick={() => logout()} >Logout</button></p>
        <div style={hideWhenVisible}>
          <button onClick={() => { setBlogFormVisible(true) }}>New blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm userId={user.id} createBlog={addBlog} />
          <button onClick={() => { setBlogFormVisible(false) }}>Cancel</button>
        </div><div id='blog-list'>
          {
            blogs.map(blog =>
              <Blog key={blog.id} blog={blog} username={user.username} handleLike={handleLike} handleRemove={handleRemove} />
            )
          }</div>
      </div>
    )
  }
}

export default App