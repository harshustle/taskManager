import React from 'react';

const TaskManager = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Task Manager</h1>
      {/* Input box and add button */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a new task"
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
          Add
        </button>
      </div>
      {/* Search box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Task list */}
      <div className="w-full max-w-md">
        <ul className="bg-white shadow-md rounded-md divide-y divide-gray-200">
          <li className="flex justify-between items-center px-4 py-2">
            <span>Task 1</span>
            <div className="flex space-x-2">
              <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Done</button>
              <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Update</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
            </div>
          </li>
          <li className="flex justify-between items-center px-4 py-2">
            <span>Task 2</span>
            <div className="flex space-x-2">
              <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Done</button>
              <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Update</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
            </div>
          </li>
          <li className="flex justify-between items-center px-4 py-2">
            <span>Task 3</span>
            <div className="flex space-x-2">
              <button className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Done</button>
              <button className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Update</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
