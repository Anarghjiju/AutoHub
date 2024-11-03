// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AppproveCarDetailContent from './components/ApproveCarDetailContent';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/pending-approval/:id" element={<AppproveCarDetailContent />} />

      </Routes>
    </Router>
  );
};

export default App;
