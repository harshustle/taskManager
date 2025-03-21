import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/" className="text-white hover:text-gray-200">
            Basti Kirana
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } absolute top-16 left-0 w-full bg-blue-600 lg:static lg:block lg:w-auto`}
        >
          <div className="flex flex-col lg:flex-row lg:space-x-4 mt-4 lg:mt-0">
            <Link to="/" className="text-white text-center pb-1 px-2 border-2 rounded-2xl hover:text-gray-200 lg:py-0">
              Home
            </Link>
            <Link to="/login-signup" className="text-white my-2 py-1 px-2 border-2 rounded-2xl text-center hover:text-gray-200 lg:py-0">
              Login/Signup
            </Link>
            <Link to="/taskmanager" className="text-white pt-1 text-center hover:text-gray-200 px-2 border-2 rounded-2xl mb-4 lg:py-0">
              Task Manager
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;