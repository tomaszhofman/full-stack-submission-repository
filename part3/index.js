const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ');
  })
);

const generateId = () => {
  return persons.length > 0 ? Math.floor(Math.random() * 1000) : 0;
};

let persons = [
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
  {
    name: 'tomek',
    number: '54545454545',
    id: 5,
  },
  {
    name: 'tomekggt',
    number: '44444',
    id: 7,
  },
  {
    name: 'ttt',
    number: 'tttt',
    id: 8,
  },
];

app.get('/info', (request, response) => {
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people<p> ${date.toJSON()}`
  );
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  const ifPersonExist = persons.find((person) => person.name === body.name);

  if (!body.number || !body.name) {
    return response.status(400).json({
      error: 'number or name missing',
    });
  } else if (ifPersonExist) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);
  response.json(person);
});

const unknownPort = (request, response) => {
  response.status(404).send({ error: 'unknow endpoint' });
};

app.use(unknownPort);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
