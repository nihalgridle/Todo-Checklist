//=====set up========
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('/home/nihal/Todo-Checklist/public'));


mongoose.connect('mongodb://localhost/todoDB');

app.listen(8080);
    console.log("App listening on port 8080");

//Todo-Checklist model

//==== Syntax for defining a model in mongoose ====
//mongoose.model('MyModel', mySchema);
// mySchema is <a Schema>

    var Todo = mongoose.model('Todo', {
        name: {
            type: String,
            default: ''
        },
        isChecked: {
            type: Boolean,
            default: false
        }
    });

//routes 
    //api
    //get all todos
    app.get('/api/todos', function(req, res) {

        //use find() to get all todos in the database
        Todo.find(function(err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });

    //create, update, changeCheckedStatus of todo and send back all todos after creation and updation
    app.post('/api/todos', function(req, res) {
        //console.log(req.body);
        //update name of todo
        if (!req.body.name && req.body.newName && req.body.id) {
            Todo.findOneAndUpdate({_id : req.body.id},{name : req.body.newName}, function(err, todos) {
                if (err) {
                    res.send(err);
                }
                //get and return all the todos after creating a todo
                Todo.find(function(err, todos) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(todos);
                });
            });
        }
        else if (!req.body.name && req.body.id) {
            Todo.findOneAndUpdate({_id : req.body.id},{isChecked : req.body.isChecked}, function(err, todos) {
                if (err) {
                    res.send(err);
                }
            });
        }
        else if (req.body.name) {
            Todo.create({name : req.body.name, isChecked : false }, function(err, todo) {
                if (err) {
                    res.send(err);
                }
                //get and return all the todos after creating a todo
                Todo.find(function(err, todos) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(todos);
                });
            });
        }
    });

    //delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {

        if (!req.params.todo_id) {
            res.send('Todo must have a valid ID!');
        }

        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err) {
                res.send(err);
            }
            //get and return all the todos after deleting todo
            Todo.find(function(err, todos) {
                if (err) {
                    res.send(err);
                }
                res.json(todos);
            });
        });
    });

    // load the single view file
    app.get('*', function (req, res) {
        res.sendFile('/home/nihal/Todo-Checklist/public/index.html'); 
    });