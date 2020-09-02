const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

// beforeAll(async () => {
//   jest.setTimeout(20000)
// })

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('getting blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('there are 6 blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
  })

  test('the first is about React patterns', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].title).toBe('React patterns')
  })

  test('a specified blog is within the returned ones', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(b => b.title)
    expect(titles).toContain('Type wars')
  })

  test('id field is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})
describe('adding a blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'A new title',
      author: 'Some Name',
      url: 'qwerty',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${await helper.getToken()}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsInDb.map(b => b.title)
    expect(titles).toContain('A new title')
  })

  test('a new blog with missing likes will get default 0 likes', async () => {
    const newBlog = {
      title: 'A blog without likes property',
      author: 'Some Name',
      url: 'qwerty',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${await helper.getToken()}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)

    const addedBlog = blogsInDb.find(b => b.title === 'A blog without likes property')
    expect(addedBlog.likes).toBe(0)
  })
  test('missing token will return 401', async () => {
    const newBlog = {
      title: 'A new title',
      author: 'Some Name',
      url: 'qwerty',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
  test('missing title will return 400', async () => {
    const newBlog = {
      author: 'No Title',
      url: 'fdsfds',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
  test('missing url will return 400', async () => {
    const newBlog = {
      title: 'Missing url',
      author: 'Hiuy Fyuh',
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

test('deleting a blog', async () => {
  const blogsInDb = await helper.blogsInDb()
  const id = (blogsInDb[0]).id
  await api.delete(`/api/blogs/${id}`).expect(204)
  expect(await helper.blogsInDb()).toHaveLength(helper.initialBlogs.length - 1)
})

test('updating a blog', async () => {
  const blogsInDb = await helper.blogsInDb()
  const blog = blogsInDb[0]
  blog.likes = 999

  await api
    .put(`/api/blogs/${blog.id}`)
    .send(blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  expect(blogs[0]).toEqual(blog)
})

afterAll(async () => {
  mongoose.connection.close()
})