require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :req[content-length] - :response-time ms - :body'))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))


app.get('/', (request, response) => {
  response.send('<h1>Fullstack open part 3, ex. 3.10 </h1>')
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(
      `Phonebook has info for ${persons.length} people <br> <br> ${Date()}`
    )
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    .catch(() => {
      response.status(404).end()
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end()
  })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const new_person = new Person({
    id: Math.floor(Math.random() * 999999),
    name: body.name,
    number: body.number
  })

  new_person.save().then(result => {
    console.log(`${result} person saved `)
    response.json(new_person)
  })
    .catch(error => next(error))

})

app.put('/api/persons/:id',(request, response, next) => {
  const body = request.body

  const new_person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, new_person, { new: true })
    .then(updatePerson => {
      response.json(updatePerson)
    })
    .catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'invalid id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})