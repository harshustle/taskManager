import React from 'react'
import TaskManager from './Pages/TaskManager'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupLogin from './Pages/SignupLogin'
import Dashboard from './Pages/Dashboard'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exactt path = '/' element={<Dashboard/>} />
        <Route exact path="/login-signup" element={<SignupLogin />} />
        <Route exact path="/taskmanager" element={<TaskManager />} />
      </Routes>
    </Router>
  )
}

export default App
