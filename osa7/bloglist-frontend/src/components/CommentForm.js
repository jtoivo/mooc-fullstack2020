import React from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogsReducer'
import { Button, Form, FormGroup } from 'react-bootstrap'

const CommentForm = ({ blog }) => {

  const dispatch = useDispatch()

  const addComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    if (comment) {
      dispatch(commentBlog(blog, comment))
      event.target.comment.value = ''
    }
  }

  return (
    <div>
      <Form onSubmit={addComment}>
        <FormGroup>
          <Form.Control name='comment' />
          <Button type="submit">add comment</Button>
        </FormGroup>
      </Form>
    </div>
  )
}

export default CommentForm
