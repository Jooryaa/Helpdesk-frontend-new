import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CreateTicket from './components/CreateTicket';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import TicketDetail from './components/TicketDetail';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ticket/:id" 
              element={
                <ProtectedRoute>
                  <TicketDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-ticket" 
              element={
                <ProtectedRoute>
                  <CreateTicket />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
