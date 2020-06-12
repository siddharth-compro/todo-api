const Todo = require('../models/todo.model.js')

exports.create = (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
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
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
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
//  Todo.find().then((todos) => {
//    res.send(todos);
//  }).catch((err)=>{
//    res.send({message: "Something went wrong!"})
//  })

var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  query.sort = {createdAt: 'desc'}
  // Find some documents
       Todo.find({},{},query,function(err,data) {
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response =  data;
            }
            res.json(response);
        });
}
