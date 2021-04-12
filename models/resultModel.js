const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  codeNumber: {
    type: Number,
    unique: true,
    required: [true, 'A result must have a code number.'],
    validate: {
      validator: function (v) {
        return v.toString().length === 5;
      },
      message: (props) => `The ID must be of length: 5. ${props.value} is not.`,
    },
  },
  microorganisms: [
    {
      microorganism: String,
      atypicalTests: [String],
      snippet: String,
      wikiTitle: String,
    },
  ],
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
