import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
  }

  return (
    <Form onSubmit={addBlog}>
      <FormGroup>
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={title}
          onChange={({ target }) => setTitle(target.value)} />

        <Form.Label>Author</Form.Label>
        <Form.Control
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />

        <Form.Label>Url</Form.Label>
        <Form.Control
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button id='create-button' type="submit">Add</Button>
      </FormGroup>
    </Form>
  )
}
BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
