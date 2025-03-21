import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../Components/Navigation';

const TaskManager = () => {
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentTask, setCurrentTask] = useState({});
    const [updatedTaskName, setUpdatedTaskName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [buttonStatus, setButtonStatus] = useState(false);
    const [compactView, setCompactView] = useState(false);

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
    };

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
    };

    const addTask = async () => {
        if (!newTask.trim()) return; // Don't add empty tasks
        try {
            const response = await axios.post('http://localhost:8080/tasks', {
                taskName: newTask.trim(),
                isDone: false
            });
            console.log('Task added:', response.data);
            fetchTasks(); // Fetch the updated tasks
            setNewTask(''); // Clear the input field after adding the task
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

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
    };

    const done = async (task) => {
        try {
            const res = await axios.put(`http://localhost:8080/tasks/${task._id}`, {
                ...task,
                isDone: true
            });
            console.log('Task updated:', res.data);
            fetchTasks(); // Fetch the updated tasks
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (task) => {
        try {
            const res = await axios.delete(`http://localhost:8080/tasks/${task._id}`);
            console.log('Task deleted:', res.data);
            fetchTasks(); // Fetch the updated tasks
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

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
    };

    const toggleCompactView = () => {
        setCompactView(!compactView);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
            <Navigation />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-2xl md:text-4xl font-bold mb-8">Task Manager</h1>
                {/* Input box and add button */}
                <div className="flex flex-col md:flex-row mb-4 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Add a new task"
                        className="px-4 py-2 border border-gray-300 rounded-t-md md:rounded-l-md md:rounded-t-none focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                        value={newTask}
                        onChange={(e) => {
                            setNewTask(e.target.value);
                        }}
                        onKeyDown={onPressEnter}
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-b-md md:rounded-r-md md:rounded-b-none hover:bg-blue-600"
                        onClick={addTask}
                    >
                        Add
                    </button>
                </div>
                {/* Search box */}
                <div className="flex flex-col md:flex-row lg:mb-4 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search tasks"
                        className="px-4 py-2 border border-gray-300 rounded-t-md md:rounded-l-md md:rounded-t-none focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 lg:mx-2 bg-purple-500 text-white rounded-xl my-2 md:rounded-xl hover:bg-purple-600 "
                        onClick={showCompletedTasks}
                    >
                        {buttonStatus === false ? "Show Done" : "Hide"}
                    </button>
                </div>
                {/* Toggle Compact View button */}
                <div className="flex flex-col md:flex-row mb-4 w-full max-w-md">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        onClick={toggleCompactView}
                    >
                        {compactView ? "Show Full View" : "Show Compact View"}
                    </button>
                </div>
                {/* Update input box */}
                {isUpdating && (
                    <div className="flex flex-col md:flex-row mb-4 w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Update task name"
                            className="px-4 py-2 border border-gray-300 rounded-t-md md:rounded-l-md md:rounded-t-none focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                            value={updatedTaskName}
                            onChange={(e) => setUpdatedTaskName(e.target.value)}
                        />
                        <button
                            className="px-4 py-2 bg-yellow-500 text-white rounded-b-md md:rounded-r-md md:rounded-b-none hover:bg-yellow-600"
                            onClick={updateTask}
                            onKeyDown={onPressEnter}
                        >
                            Update
                        </button>
                    </div>
                )}
                {/* Task list */}
                {filteredTasks.map((task, idx) => (
                    <div key={idx} className="w-full max-w-md mb-4">
                        <ul className="bg-white shadow-md rounded-md divide-y divide-gray-200">
                            <li className="flex flex-col justify-between items-center px-4 py-2">
                                <div className={`text-lg m-3 font-semibold ${task.isDone ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                    {task.taskName}
                                </div>
                                {!compactView && (
                                    <div className="flex space-x-2 mt-2">
                                        <button
                                            className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full transform transition-transform duration-300 hover:scale-110"
                                            value={task.isDone}
                                            onClick={() => done(task)}
                                        >
                                            Done
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full transform transition-transform duration-300 hover:scale-110"
                                            onClick={() => startUpdate(task)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="px-2 py-1 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full transform transition-transform duration-300 hover:scale-110"
                                            onClick={() => deleteTask(task)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TaskManager;