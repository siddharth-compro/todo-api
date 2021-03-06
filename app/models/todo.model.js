const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
    subtask: [{
      title: String,
      description: String,
      completed: { type: Boolean, default: false },
      archived: { type: Boolean, default: false }
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Todo', TodoSchema);
