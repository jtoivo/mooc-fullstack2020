import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog({
      title,
      author,
      url
    })
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        Title<input
          id='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        /><br />
          Author<input
          id='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        /><br />
          Url<input
          id='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        /><br />
        <button id='create-button' type="submit">Add</button>
      </form><br /></div>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
