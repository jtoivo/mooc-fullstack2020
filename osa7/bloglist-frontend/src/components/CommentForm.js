import React, { useState } from 'react'

const CommentForm = ({ createComment }) => {
  const [comment, setComment] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    createComment(comment)
  }

  return (
    <div>
      <form onSubmit={addComment}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        /><button type="submit">add comment</button>
      </form><br /></div>
  )
}

export default CommentForm
