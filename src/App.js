// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import Dashboard from './components/Dashboard'; // Create Dashboard component for authenticated users
import ProjectForm from './components/ProjectForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<ProjectForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
