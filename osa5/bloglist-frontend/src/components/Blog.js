import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, username, handleLike, handleRemove }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const showOrHide = () => {
    setShowDetails(!showDetails)
    setButtonText(showDetails ? 'view' : 'hide')
  }

  const addLike = async () => {
    await handleLike(blog)
  }

  const remove = () => {
    if (window.confirm(`Remove '${blog.title}'?`)) {
      handleRemove(blog)
    }
  }

  const blogStyle = {
    padding: 8,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const detailsStyle = { display: showDetails ? '' : 'none' }
  const removeStyle = { display: blog.user.username === username ? '' : 'none' }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button className='details-button' onClick={showOrHide}>{buttonText}</button>
      <div className='details' style={detailsStyle}>
        <div className='url'>{blog.url}</div>
        <div className='likes'>likes: {blog.likes} <button className='like-button' onClick={addLike}>like</button></div>
        <div>{blog.user.name}</div>
        <button className='remove-button' style={removeStyle} onClick={remove}>remove</button>
      </div >
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}
export default Blog
