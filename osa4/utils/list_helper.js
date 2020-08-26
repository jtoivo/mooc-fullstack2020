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
    for (let [key, val] of Object.entries(grouped)) {
      if (val.length > max) {
        max = val.length
        author = key
      }
    }
    return { author: author, blogs: max }
  }
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}