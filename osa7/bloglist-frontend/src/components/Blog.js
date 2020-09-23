import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, commentBlog, removeBlog } from '../reducers/blogsReducer'
import CommentForm from '../components/CommentForm'
import { useRouteMatch } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const username = useSelector(state => state.user.username)

  const match = useRouteMatch('/blogs/:id')
  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null

  if (!username || !blog) return null

  const removeStyle = { display: blog.user.username === username ? '' : 'none' }

  const addComment = (comment) => {
    dispatch(commentBlog(blog, comment))
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div className='url'><a href={blog.url}>{blog.url}</a> </div>
      <div className='likes'>likes: {blog.likes} <button className='like-button' onClick={() => dispatch(likeBlog(blog))}>like</button></div>
      <div>{blog.user.name}</div>
      <button className='remove-button' style={removeStyle} onClick={() => dispatch(removeBlog(blog.id))}>remove</button>
      <div>
        <h3>Comments</h3>
        <CommentForm createComment={addComment} />
        <ul>
          {blog.comments.map(c => {
            return <li key={c.id}>{c.content}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Blog
