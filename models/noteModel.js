const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
});
