const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = request.token
    ? jwt.verify(request.token, process.env.SECRET)
    : null

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const blog = await Blog.findById(id)

  const decodedToken = request.token
    ? jwt.verify(request.token, process.env.SECRET)
    : null

  if (!request.token || !decodedToken || blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: 'invalid or missing token' })
  }

  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(id)
    return response.status(204).end()
  }

  return response.status(401).json({ error: 'invalid permission to delete' })
})

blogRouter.put('/api/blogs/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const blog = new Blog({
    title: body.name,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  await Blog.findByIdAndUpdate(id, blog, { new: true })

  response.json(blog.toJSON())
})

module.exports = blogRouter