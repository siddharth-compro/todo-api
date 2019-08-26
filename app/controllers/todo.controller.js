const Todo = require('../models/todo.model.js')

exports.create = (req, res) => {
  const todo = new Todo({
    content: req.body.content,
    subtask: req.body.subtask
  });
  todo.save().then((data)=> {
    res.send(data);
  }).catch((err)=>{
    res.send({message: "Todo not created!"})
  })
}

exports.update = (req, res) => {
  Todo.findByIdAndUpdate(req.params.todoId, {
    content: req.body.content,
    subtask: req.body.subtask
  }, {new: true}).then((todo)=>{
    if(!todo) {
      return res.status(404).send({
        message: "Todo not found with id"
      });
    }
    res.send(todo)
  }).catch((err)=>{
    res.send({message: "Todo not found!"})
  })
}

exports.delete = (req, res) => {
  Todo.findByIdAndRemove(req.params.todoId)
    .then(todo => {
      if(!todo) {
        return res.status(404).send({
          message: "Todo not found"
        });
      }
      res.send({message: "Todo deleted successfully!"});
    }).catch((err)=>{
      res.send({message: "Todo not found!"})
    })
}

exports.findOne = (req, res) => {
  Todo.findById(req.params.todoId)
    .then(todo => {
        if(!todo) {
            return res.status(404).send({
                message: "Todo not found with id "
            });
        }
        res.send(todo);
    }).catch((err)=>{
      res.send({message: "Todo not found!"})
    })
}

exports.findAll = (req, res) => {
  Todo.find().then((todos) => {
    res.send(todos);
  }).catch((err)=>{
    res.send({message: "Something went wrong!"})
  })
}
