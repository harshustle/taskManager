const router = require('express').Router();   // router is a class in express that is used to create the routes
const { createTask, fetchTasks, deleteTask, updateTask, searchTask } = require('../Controllers/TaskController');
const TaskModel = require('../Models/TaskModel');   // TaskModel is the model that we created in the Models folder

// Get all the tasks
router.get('/', async(req,res)=>{
    try {
        const tasks = await TaskModel.find();  
        res.json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Server Error'});
    }
})


router.post('/', createTask)
router.get('/', fetchTasks)
router.delete('/:id', deleteTask)
router.put('/:id', updateTask)
router.get('/search', searchTask)


module.exports = router;