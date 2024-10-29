// src/App.tsx
import React from 'react';
import './styles/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import CarBrandListing from './pages/CarBrandListing';
import CarListing from './pages/CarListing';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/brands" element={<CarBrandListing />} />
        <Route path="/cars" element={<CarListing />} />
      </Routes>
    </Router>
  );
};

export default App;
