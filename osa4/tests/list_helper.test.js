/* eslint-disable indent */
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const oneBlog = [
  {
    title: 'Aihe',
    author: 'Nimi',
    likes: 45
  }
]
const blogs = [
  { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 },
  { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5 },
  { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12 },
  { title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10 },
  { title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0 },
  { title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2 }
]

describe('total likes', () => {
  test('Empty list', () => expect(listHelper.totalLikes([])).toBe(0))
  test('List of only one blog', () => expect(listHelper.totalLikes(oneBlog)).toBe(45))
  test('Multiple blogs', () => expect(listHelper.totalLikes(blogs)).toBe(36))
})

describe('favorite blog', () => {
  test('Empty list', () => expect(listHelper.favoriteBlog([])).toBe(null))
  test('List of only one blog', () => expect(listHelper.favoriteBlog(oneBlog))
    .toEqual(
      {
        title: 'Aihe',
        author: 'Nimi',
        likes: 45
      }))
  test('Multiple blogs', () => expect(listHelper.favoriteBlog(blogs))
    .toEqual(
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
      }))
})

describe('most blogs', () => {
  test('Empty list', () => expect(listHelper.mostBlogs([])).toBe(null))
  test('List of only one blog', () => expect(listHelper.mostBlogs(oneBlog))
    .toEqual(
      {
        author: 'Nimi',
        blogs: 1
      }))
  test('Multiple blogs', () => expect(listHelper.mostBlogs(blogs))
    .toEqual(
      {
        author: 'Robert C. Martin',
        blogs: 3
      }))
})

describe('most likes', () => {
  test('Empty list', () => expect(listHelper.mostLikes([])).toBe(null))
  test('List of only one blog', () => expect(listHelper.mostLikes(oneBlog))
    .toEqual(
      {
        author: 'Nimi',
        likes: 45
      }))
  test('Multiple blogs', () => expect(listHelper.mostLikes(blogs))
    .toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }))
})
