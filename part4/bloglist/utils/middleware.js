/* eslint-disable no-console */
const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

const tokenExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    if (error.errors.name) {
      const e = error

      if (e.errors.name.kind === 'unique') {
        return res.status(400).json({ error: 'name must be unique' })
      }

      if (e.errors.name.kind === 'required') {
        return res.status(400).json({ error: 'name must be at least 3 characters long' })
      }

      if (e.errors.name.kind === 'minlength') {
        return res.status(400).json({ error: 'name must be at least 3 characters long' })
      }
    }

    if (error.errors.number) {
      const e = error

      if (e.errors.number.kind === 'required') {
        return res.status(400).json({ error: 'number must be at least 8 characters long' })
      }

      if (e.errors.number.kind === 'minlength') {
        return res.status(400).json({ error: 'number must be at least 8 characters long' })
      }
    }

    console.log(error)
  }

  next(e)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}