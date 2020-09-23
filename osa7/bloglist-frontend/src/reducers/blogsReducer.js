import blogService from '../services/blogs'
import { setNotification, setErrorMessage } from '../reducers/notificationReducer'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data.blogs.sort((a, b) => b.likes - a.likes)
  case 'CREATE_BLOG':
    return state.concat(action.data.blog)
  case 'UPDATE_BLOG':
    return state.map(b => b.id !== action.data.blog.id ? b : action.data.blog).sort((a, b) => b.likes - a.likes)
  case 'COMMENT_BLOG':
    return state.map(b => b.id !== action.data.blog.id ? b : action.data.blog)
  case 'REMOVE_BLOG':
    return state.filter(b => b.id !== action.data.id)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: { blogs }
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch({
        type: 'CREATE_BLOG',
        data: { blog: newBlog }
      })
      dispatch(setNotification(`Added '${blog.title}'`, 5))
    }
    catch (error) {
      dispatch(setErrorMessage(`Creating blog failed: ${error.message}`, 10))
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      blog.likes += 1
      const updatedBlog = await blogService.update(blog)
      dispatch({
        type: 'UPDATE_BLOG',
        data: { blog: updatedBlog }
      })
    }
    catch (error) {
      dispatch(setErrorMessage(`Adding a like failed: ${error.message}`, 10))
    }
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    try {
      const addedComment = await blogService.comment(blog.id, { content: comment })
      blog.comments = blog.comments.concat(addedComment)
      dispatch({
        type: 'COMMENT_BLOG',
        data: { blog }
      })
    }
    catch (error) {
      dispatch(setErrorMessage(`Adding comment failed: ${error.message}`, 10))
    }
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: { id }
      })
      dispatch(setNotification('Blog removed.', 5))
    }
    catch (error) {
      dispatch(setErrorMessage(`Removing blog failed: ${error.message}`, 10))
    }
  }
}

export default blogsReducer