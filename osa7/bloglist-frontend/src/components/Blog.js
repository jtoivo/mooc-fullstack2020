import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import CommentForm from '../components/CommentForm'
import { useRouteMatch } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'

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

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle>{blog.author}</Card.Subtitle>
          <Card.Text><br />
            <a href={blog.url}>{blog.url}</a></Card.Text>
          <Card.Text>
            likes: {blog.likes} <Button className='like-button' onClick={() => dispatch(likeBlog(blog))}>like</Button>
          </Card.Text>
          <Card.Text>
            Added by {blog.user.name}
          </Card.Text>
          <Button className='remove-button' style={removeStyle} onClick={() => dispatch(removeBlog(blog.id))}>remove</Button>
        </Card.Body>
      </Card>
      <div style={{ 'marginTop': 20 }}>
        <h4>Comments</h4>
        <CommentForm blog={blog} />
        <ul>
          {blog.comments.map(c => {
            return <li key={c.id}>{c.content}</li>
          })}
        </ul>
      </div></div >

  )
}

export default Blog
