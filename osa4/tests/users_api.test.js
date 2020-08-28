const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeAll(async () => {
  jest.setTimeout(20000)
})

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('qwerty', 10)
  const user = new User({ username: 'test', passwordHash })
  await user.save()
})

describe('adding a user', () => {
  test('a valid user is successfully added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'new',
      name: 'New User',
      password: '12345',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('a user with invalid password is not added', async () => {
    const usersAtStart = await helper.usersInDb()
    const invalidUser = {
      username: 'user',
      name: 'New User',
      password: '12',
    }
    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error.toLowerCase()).toContain('password')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('a user with existing username is not added', async () => {
    const usersAtStart = await helper.usersInDb()
    const invalidUser = {
      username: 'test',
      name: 'Already Taken',
      password: '123456',
    }
    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body.error).toContain('to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('a user with invalid username is not added', async () => {
    const usersAtStart = await helper.usersInDb()
    const invalidUser = {
      username: 't',
      name: 'Too Short',
      password: '123456',
    }
    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body.error).toContain('minimum allowed length')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})
afterAll(async () => {
  mongoose.connection.close()
})