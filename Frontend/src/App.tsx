// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/styles.css';
import Home from './pages/Home';
import CarBrandListing from './pages/CarBrandListing';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brands" element={<CarBrandListing />} />
      </Routes>
    </Router>
  );
};

export default App;
