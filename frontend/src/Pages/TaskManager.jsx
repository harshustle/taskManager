import React, { useEffect, useState } from 'react';
import axios from 'axios';


const TaskManager = () => {
    const [newTask, setNewTask] = useState([])
    const [tasks, setTasks] = useState([])
    const [isUpdating, setIsUpdating] = useState(false)
    const [currentTask, setCurrentTask] = useState({})
    const [updatedTaskName, setUpdatedTaskName] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [buttonStatus, setButtonStatus] = useState(false)




    const filteredTasks = tasks.filter(task =>
        task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const startUpdate = async (task) => {
        try {
            setIsUpdating(true);
            setCurrentTask(task);
            setUpdatedTaskName(task.taskName);
            fetchTasks(); // Fetch the updated tasks
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    const updateTask = async () => {
        if (!updatedTaskName.trim()) return; // Don't update task with empty name
        try {
            const response = await axios.put(`http://localhost:8080/tasks/${currentTask._id}`, {
                ...currentTask,
                taskName: updatedTaskName.trim(),
                isDone: false
            });
            console.log('Task updated:', response.data);
            fetchTasks(); // Fetch the updated tasks
            setIsUpdating(false); // Hide the update input box
            setUpdatedTaskName(''); // Clear the update input field
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    const addTask = async () => {
        if (!newTask.trim()) return; // Don't add empty tasks
        try {
            const response = await axios.post('http://localhost:8080/tasks', {
                taskName: newTask.trim(),
                isDone: false
            });
            console.log('Task added:', response.data);
            fetchTasks(); // Fetch the updated tasks
            setNewTask(""); // Clear the input field after adding the task
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }
    const onPressEnter = (e) => {
        if (e.key === 'Enter') {
            addTask();
        } else if (e.key === 'Escape') {
            setNewTask(''); // Clear the input field after adding the task
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/tasks');
            console.log('Tasks fetched:', response.data);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    const done = async (task) => {
        try {
            const res = await axios.put(`http://localhost:8080/tasks/${task._id}`, {
                ...task,
                isDone: true
            })
            console.log('Task updated:', res.data);
            fetchTasks(); // Fetch the updated tasks
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    const deleteTask = async (task) => {
        try {
            const res = await axios.delete(`http://localhost:8080/tasks/${task._id}`)
            console.log('Task deleted:', res.data);
            fetchTasks(); // Fetch the updated tasks
        } catch (error) {

        }
    }

    const showCompletedTasks = async () => {
        try {
            if (buttonStatus === false) {
                const response = await axios.get('http://localhost:8080/tasks');
                console.log('Tasks fetched:', response.data);
                setTasks((response.data).filter(task => task.isDone === true));
                setButtonStatus(true);
            } else {
                const response = await axios.get('http://localhost:8080/tasks');
                console.log('Tasks fetched:', response.data);
                setTasks(response.data);
                setButtonStatus(false);
            }


        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }


    useEffect(() => {
        fetchTasks();
    }, [])


    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold mb-8">Task Manager</h1>
                {/* Input box and add button */}
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Add a new task"
                        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newTask}
                        onChange={(e) => {
                            setNewTask(e.target.value)
                        }}
                        onKeyDown={onPressEnter}
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                        onClick={addTask}

                    >
                        Add
                    </button>
                </div>
                {/* Search box */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search tasks"
                        className="px-4 py-2 border border-gray-300 rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="px-4 ml-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500" onClick={() => {
                        showCompletedTasks()
                    }}>{buttonStatus === false ? "Show Done" : "Hide"}</button>
                </div>
                {/* update input box */}
                {isUpdating && (<div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Update task name"
                        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={updatedTaskName}
                        onChange={(e) => setUpdatedTaskName(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-yellow-500 text-white rounded-r-md hover:bg-yellow-600"
                        onClick={updateTask}
                        onKeyDown={onPressEnter}
                    >
                        Update
                    </button>
                </div>)}
                {/* Task list */}
                {filteredTasks.map((task, idx) => {
                    return (<div key={idx} className="w-full max-w-md">
                        <ul className="bg-white shadow-md rounded-md divide-y divide-gray-200">
                            <li className="flex justify-between items-center px-4 py-2">
                                <span className={task.isDone ? 'line-through' : ''}>{task.taskName}</span>
                                <div className="flex space-x-2">
                                    <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        value={task.isDone}
                                        onClick={() => done(task)}
                                    >Done</button>
                                    <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        onClick={() => startUpdate(task)}
                                    >Update</button>
                                    <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={() => deleteTask(task)}
                                    >Delete</button>
                                </div>
                            </li>
                        </ul>
                    </div>)
                })}
            </div>
        </>
    );
};

export default TaskManager;
