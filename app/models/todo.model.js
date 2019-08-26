const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    content: String,
    subtask:[{
      description: String,
      completed: { type: Boolean, default: false }
    }]
});

module.exports = mongoose.model('Todo', TodoSchema);
