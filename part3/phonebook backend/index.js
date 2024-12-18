const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('tiny'))

morgan.token('postData', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
  });
  

  const morganFormat = ':method :url :status :response-time ms - :res[content-length] :postData';
 
  app.use(morgan(morganFormat));

const requestTime = new Date()

let phonebook = [
	{
		id: '1',
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: '2',
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: '3',
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: '4',
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
]

app.get('/info', (request, response) => {
	response.send(`<p>Phonebook has info for ${phonebook.length} people <br/>
       ${requestTime} </p>`)
})

app.get('/api/persons', (request, response) => {
	response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = phonebook.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = phonebook.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = phonebook.length > 0
      ? Math.max(...phonebook.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  app.use(express.json())

  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.number) {
      return response.status(400).json({ 
        error: 'phone missing' 
      })
    }

    if(phonebook.find(person => person.name === body.name)){
        return response.status(400).json({ 
            error: 'name must be unique' 
          })
    }
  
    const person = {
        id: generateId(),
      name: body.name,
      number: body.number,
    }
  
    phonebook = phonebook.concat(person)
  
    response.json(person)
  })

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} `)
})
