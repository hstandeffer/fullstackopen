const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return total
}

const favoriteBlog = (blogs) => {
  let max = 0
  let maxEle
  blogs.map((blog) => {
    if (blog.likes > max) {
      max = blog.likes
      maxEle = blog
    }
  })
  delete maxEle._id
  delete maxEle.url
  delete maxEle.__v
  return maxEle
}

const totalBlogs = (blogs) => {
  return blogs.length
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  totalBlogs,
}