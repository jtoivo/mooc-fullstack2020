const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, b) => sum + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  else {
    return blogs.reduce((prev, current) => {
      return (prev.likes > current.likes) ? prev : current
    })
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) { return null }
  else {
    const grouped = _.groupBy(blogs, b => b.author)
    let max = 0
    let author
    for (let key in grouped) {
      if (grouped[key].length > max) {
        max = grouped[key].length
        author = key
      }
    }
    return { author: author, blogs: max }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) { return null }
  else {
    const grouped = _.groupBy(blogs, b => b.author)
    let max = -1
    let author
    for (let key in grouped) {
      const likes = grouped[key].reduce((sum, b) => sum + b.likes, 0)
      if (likes > max) {
        max = likes
        author = key
      }
    }
    return { author: author, likes: max }
  }
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}