const mongoose = require('mongoose');   // mongoose for database creation
const Schema = mongoose.Schema;       // Schema for defining the structure of the database

// Define the user schema
const taskSchema = new Schema({      // Schema is a class in mongoose that defines the structure of the database
    taskName: {
        type: String,
        required: true
    },
    isDone :{
        type: Boolean,
        default: false
    }
});

// Create the User model
const TaskModel = mongoose.model('todos', taskSchema);   // Model is a class in mongoose that is used to create the collection in the database


module.exports = TaskModel;