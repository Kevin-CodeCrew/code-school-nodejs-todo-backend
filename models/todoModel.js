const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);  // workaround for deprecated warning

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    username: String,
    todo: String,
    isDone: Boolean,
    dueDate: Date
});

const Todos = mongoose.model('Todos', todoSchema);

// Export as Todos
module.exports = Todos;