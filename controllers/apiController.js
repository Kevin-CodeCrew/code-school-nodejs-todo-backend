// We first need to load our mongoose data model
const Todos = require('../models/todoModel');
const moment = require('moment');

// Include body parser
const bodyParser = require('body-parser'); // In node_modules
module.exports = function (app) {

    app.use(bodyParser.json()); // Use body parser middleware
    app.use(bodyParser.urlencoded({extended: true})); // Parse out any JSON from body and handle URL encoded data
    // Allow CORS
    app.use(function(request, response, next) {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // Add a method to get all open todos
    app.get('/api/todos/all/open', function (req, res) {

        console.log("Get all ToDos for a user");
        Todos.find({isDone: false}, function (err, todos) { //Use the find method on the data model to search DB
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send the JSON back to the client in the web response
            res.send(todos);
        });

    });

    //  Add a method to get all todos for a particular User (uname)
    app.get('/api/todos/:uname', function (req, res) {

        // ROUTE: GET a user's list of todos
        Todos.find({username: req.params.uname}, function (err, todos) { //Use the find method on the data model to search DB
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send the JSON back to the client in the web response
            res.send(todos);
        });

    });


    // ROUTE: GET ToDo list items older than somenumber of days that are still open
    app.get('/api/todo/age/:numdays', function (req, res) {
        let ageDays = req.params.numdays;
        console.log(`Checking for ToDos older than ${ageDays} days.`);
        var cutoff = moment().subtract(ageDays, 'days');
        console.log(cutoff);

        Todos.find({$and:[{dueDate: {$lte: cutoff} },{isDone: false }]}, function (err, todos) {
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send the JSON back to the client in the web response
            res.send(todos);
        });
    });


    // ROUTE: GET a specific To Do list item by it's record ID
    app.get('/api/todo/:id', function (req, res) {
        console.log("Get a specific ToDo for a user");

        Todos.findById({_id: req.params.id}, function (err, todo) { //Use the findID method on the data model to search DB
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send the JSON back to the client in the web response
            res.send(todo);
        });

    });


    // ROUTE: POST (create) a new Todo item to my list
    app.post('/api/todo', function (req, res) {
        console.log("Creating a ToDo for a user");

        let currentDate = moment();
        const newTodo = Todos({
            username: req.body.username,
            todo: req.body.todo,
            isDone: req.body.isDone,
            dueDate: currentDate // Current date
        });
        newTodo.save(function (err) {
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send a simple SUCCESS message
            res.json({result: 'OK'});
        });

    });

    // ROUTE: UPDATE and existing item
    app.put('/api/todo', function (req, res) {
        console.log("Update a ToDo for a user: "+req.body.id);

        Todos.findByIdAndUpdate(req.body.id, {
            todo: req.body.todo,
            isDone: req.body.isDone
        }, function (err, todo) {
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send a simple SUCCESS message
            console.log(todo);
            res.json({result: 'OK'});
        });

    });

    // ROUTE: DELETE an existing todo item by its ID
    app.delete('/api/todo', function (req, res) {
        console.log("Delete a ToDo for a user: "+req.body.id);

        // Todos.findOneAndDelete(req.body.id, function (err) {  // FIXME: Doesn't work from Postman (?)
            Todos.findByIdAndRemove(req.body.id, function (err) {
            if (err) {
                throw err; // If we get an error then bail
            }
            // Use Express to send a simple SUCCESS message
            res.json({result: 'OK'});
        })

    });

};