const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: 'unknown endpoint'
  })
}

app.use(cors())
app.use(bodyParser.json())
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))

let persons = [
  {
    name: "jimbo frank",
    number: "123-456-7890",
    id: 1
  },
  {
    name: "kimbo frank",
    number: "234-567-8901",
    id:2
  },
  {
    name: "john johnson",
    number: "234-567-8201",
    id:3
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/info', (req, res) => {
  const info = `phonebook has info for ${persons.length}\n${new Date()}`

  res.send(info)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  }
  else {
    return res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  // morgan(':method :url :status :res[content-length] - :response-time ms :body')

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  const nameFound = persons.some(person => person.name === body.name)

  if (nameFound) {
    return res.status(400).json({
      error: 'name already exists'
    })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * Math.floor(10000))
  }

  persons = persons.concat(newPerson)

  res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})