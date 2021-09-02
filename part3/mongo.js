const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phoneNumber = process.argv[4];

const url = `mongodb+srv://fullStack:${password}@fullstackopen.nsjme.mongodb.net/fullStackOpen?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  number: String,
  id: Number,
  name: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((note) => {
      console.log(`${note.name} ${note.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: name,
    number: phoneNumber,
    id: 1,
  });

  person.save().then((resolut) => {
    console.log(resolut);
    console.log(`added ${resolut.name} number ${resolut.number} to phonebook`);
    mongoose.connection.close();
  });
}
