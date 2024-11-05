// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AppproveCarDetailContent from './components/ApproveCarDetailContent';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './ProtectedRoutes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/pending-approval/:id" element={<AppproveCarDetailContent />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
