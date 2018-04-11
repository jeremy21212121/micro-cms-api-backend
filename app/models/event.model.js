const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  start_time: String,
  name: String,
  description: String
}, {
  timestamps: true
});

module.exports = mongoose.model('EventTang', eventSchema);
