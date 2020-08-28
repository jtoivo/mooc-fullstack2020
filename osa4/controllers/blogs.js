const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (blog.likes === undefined)
    blog.likes = 0

  if (blog.title === undefined || blog.url === undefined)
    response.status(400)

  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter