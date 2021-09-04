const mongoose = require('mongoose');

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
  name: String,
  phoneNumber: String,
  id: Number,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
