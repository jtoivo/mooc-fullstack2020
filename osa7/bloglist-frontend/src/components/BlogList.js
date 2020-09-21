import React from 'react'
import { useSelector } from 'react-redux'
import Blog from '../components/Blog'

const BlogList = () => {

  const username = useSelector(state => state.user.username)
  const blogs = useSelector(state => state.blogs)

  return (
    <div id='blog-list'>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} username={username} />
        )
      }
    </div>
  )
}

export default BlogList