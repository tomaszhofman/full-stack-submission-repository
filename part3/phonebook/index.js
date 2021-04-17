const { response, request } = require('express');
require('dotenv').config();
const express = require('express');

const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json()); // convert post to json
app.use(cors()); // prevent cors from same browser
app.use(express.static('build')); // fetch files from frontend

app.use(morgan(':method :url :status :response-time ms :body '));
morgan.token('body', (req) => JSON.stringify(req.body));
// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method);
//   console.log('Path:  ', request.path);
//   console.log('Body:  ', request.body);
//   console.log('---');
//   next();
// };

// app.use(requestLogger);\
const Person = require('./models/note');

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

const info = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    
    `;

app.get('/api/persons', (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get('/info', (request, response) => {
  response.send(info);
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
      // console.log(error);
      // response.status(400).send({ error: 'malformatted id' });
    });

  // if (person) {
  //   response.json(person);
  // } else {
  //   response.status(404).end();
  // }
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.json(result);
      response.status(204).end();
    })
    .catch((error) => next(error));
  // const id = Number(request.params.id);
  // persons = persons.filter((person) => person.id !== id);
  // response.status(204).end();
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;
  console.log('working');
  const updatePerson = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, updatePerson, { new: true })
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;
  if (body.name === undefined) {
    response.status(400).json({ error: 'content missing' });
  }
  if (persons.some((person) => person.name === body.name)) {
    response.status(400).json({ error: 'name must be quique' });
  }
  const newPerson = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  });

  newPerson
    .save()
    .then((savedPerson) => {
      return savedPerson.toJSON();
    })
    .then((savedAndFormatedPerson) => {
      response.json(savedAndFormatedPerson);
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  console.log(error.name);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);
