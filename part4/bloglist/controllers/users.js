const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('users')

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  
  if (body.password.length < 4) {
    return response.status(400).json('password must be at least 3 characters long')
  }

  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  // creating new user object
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash
  })

  const savedUser = await user.save()

  return response.json(savedUser)
})

usersRouter.delete('/api/users/:id', async (request, response) => {
  const id = request.params.id

  await User.findByIdAndRemove(id)
  response.status(204).end()
})

module.exports = usersRouter