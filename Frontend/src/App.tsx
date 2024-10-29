// src/App.tsx
import React from 'react';
import './styles/styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import CarBrandListing from './pages/CarBrandListing';
import CarDetail from './pages/CarDetailsPage'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<CarDetail />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/brands" element={<CarBrandListing />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
