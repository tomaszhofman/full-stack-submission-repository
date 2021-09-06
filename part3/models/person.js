const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URL;

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to mongoDB');
  })
  .catch((error) => {
    console.log('error connecting to mongoDB', error.message);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  number: { type: String, minlength: 8 },
  id: Number,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

personSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Person', personSchema);
