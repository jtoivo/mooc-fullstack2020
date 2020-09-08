import React, { useState } from 'react'

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
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>

      <form onSubmit={addBlog}>
        Title<input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        /><br />
          Author<input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        /><br />
          Url<input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        /><br />
        <button type="submit">Add</button>
      </form><br /></div>
  )
}
export default BlogForm
