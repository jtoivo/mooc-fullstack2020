import React from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogsReducer'

const CommentForm = ({ blog }) => {

  const dispatch = useDispatch()
  const addComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, event.target.comment.value))
    event.target.comment.value = ''
  }

  return (
    <div>
      <form onSubmit={addComment}>
        <input name='comment' /><button type="submit">add comment</button>
      </form><br /></div>
  )
}

export default CommentForm
