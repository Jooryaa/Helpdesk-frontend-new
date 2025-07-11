import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/tickets');
      setTickets(response.data);
    } catch (error) {
      setError('Failed to fetch tickets');
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusColor = (status) => {
    return status === 'open' ? 'status-open' : 'status-closed';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading tickets...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Helpdesk Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.name}</span>
            <span className="user-role">({user?.role})</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-actions">
          <button 
            onClick={() => navigate('/create-ticket')} 
            className="create-ticket-button"
          >
            Create New Ticket
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="tickets-section">
          <h2>
            {user?.role === 'admin' ? 'All Tickets' : 'My Tickets'} 
            ({tickets.length})
          </h2>
          
          {tickets.length === 0 ? (
            <div className="no-tickets">
              <p>No tickets found.</p>
              {user?.role === 'staff' && (
                <button 
                  onClick={() => navigate('/create-ticket')} 
                  className="create-first-ticket"
                >
                  Create Your First Ticket
                </button>
              )}
            </div>
          ) : (
            <div className="tickets-grid">
              {tickets.map((ticket) => (
                <div key={ticket._id} className="ticket-card">
                  <div className="ticket-header">
                    <h3 className="ticket-title">{ticket.title}</h3>
                    <div className="ticket-meta">
                      <span className={`status ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`priority ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                  
                  <p className="ticket-description">{ticket.description}</p>
                  
                  <div className="ticket-footer">
                    <div className="ticket-info">
                      <span>Created by: {ticket.createdBy?.name}</span>
                      <span>Created: {formatDate(ticket.createdAt)}</span>
                    </div>
                    <button 
                      onClick={() => navigate(`/ticket/${ticket._id}`)}
                      className="view-ticket-button"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 