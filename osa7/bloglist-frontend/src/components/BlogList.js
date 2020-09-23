import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    padding: 8,
    border: 'solid',
    borderWidth: 1,
    marginTop: 5
  }

  return (
    <div id='blog-list'>

      {
        blogs.map(blog => {
          return (
            <div key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`} >{blog.title} {blog.author} </Link>
            </div>
          )
        })
      }

    </div>
  )
}

export default BlogList