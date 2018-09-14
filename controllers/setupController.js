// We first need to load our mongoose data model
const Todos = require('../models/todoModel');
const moment = require('moment');

module.exports = function(app) {
    // Add an API endpoint with some dummy data
   app.get('/api/setupTodos', function(req, res) {
       
       // seed database
       const starterTodos = [
           {
               username: 'testuser',
               todo: 'Buy milk',
               isDone: false,
               dueDate: moment().subtract(10, 'days').calendar()
           },
           {
               username: 'testuser',
               todo: 'Feed dog',
               isDone: false,
               dueDate: moment().format()
           },
           {
               username: 'testuser',
               todo: 'Learn Node',
               isDone: false,
               dueDate: moment().subtract(7, 'days').calendar()
           }
       ];

       // Use the mongo method create to create records fopr the test data. err will hold any errors after create
       // and results will show records created.
       Todos.create(starterTodos, function(err, results) {
           // Lets us confirm that the seed data added via mongoose without any errors
           res.send(results);
       }); 
   });
    
};