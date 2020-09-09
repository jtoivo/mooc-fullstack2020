import React, { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const detailsVisibility = { display: showDetails ? '' : 'none' }

  const showOrHide = () => {
    setShowDetails(!showDetails)
    setButtonText(showDetails ? 'view' : 'hide')
  }

  const addLike = async () => {
    await handleLike(blog)
  }

  const blogStyle = {
    padding: 8,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={showOrHide}>{buttonText}</button>
      <div style={detailsVisibility}>
        {blog.url}<br />
        {blog.likes} <button onClick={addLike}>like</button><br />
        {blog.user.name}
      </div >
    </div>
  )
}

export default Blog
