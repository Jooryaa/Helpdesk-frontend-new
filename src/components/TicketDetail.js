import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './TicketDetail.css';

const TicketDetail = () => {
  const [ticket, setTicket] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTicketDetails();
  }, [id]);

  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/tickets/${id}`);
      setTicket(response.data.ticket);
      setReplies(response.data.replies);
    } catch (error) {
      setError('Failed to fetch ticket details');
      console.error('Error fetching ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    
    if (!newReply.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post('/replies', {
        ticketId: id,
        content: newReply.trim()
      });
      
      setReplies([...replies, response.data]);
      setNewReply('');
    } catch (error) {
      setError('Failed to add reply');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await axios.patch(`/tickets/${id}/status`, {
        status: newStatus
      });
      setTicket(response.data);
    } catch (error) {
      setError('Failed to update ticket status');
    }
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
      <div className="ticket-detail-container">
        <div className="loading">Loading ticket details...</div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="ticket-detail-container">
        <div className="error-message">Ticket not found</div>
      </div>
    );
  }

  return (
    <div className="ticket-detail-container">
      <div className="ticket-detail-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Dashboard
        </button>
        <h1>Ticket Details</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="ticket-detail-content">
        <div className="ticket-main">
          <div className="ticket-header">
            <h2>{ticket.title}</h2>
            <div className="ticket-meta">
              <span className={`status ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </span>
              <span className={`priority ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority}
              </span>
            </div>
          </div>

          <div className="ticket-info">
            <p><strong>Created by:</strong> {ticket.createdBy?.name}</p>
            <p><strong>Created:</strong> {formatDate(ticket.createdAt)}</p>
            {ticket.closedAt && (
              <p><strong>Closed:</strong> {formatDate(ticket.closedAt)}</p>
            )}
          </div>

          <div className="ticket-description">
            <h3>Description</h3>
            <p>{ticket.description}</p>
          </div>

          {user?.role === 'admin' && (
            <div className="admin-actions">
              <h3>Admin Actions</h3>
              <div className="status-actions">
                <button
                  onClick={() => handleStatusChange('open')}
                  className={`status-button ${ticket.status === 'open' ? 'active' : ''}`}
                  disabled={ticket.status === 'open'}
                >
                  Mark as Open
                </button>
                <button
                  onClick={() => handleStatusChange('closed')}
                  className={`status-button ${ticket.status === 'closed' ? 'active' : ''}`}
                  disabled={ticket.status === 'closed'}
                >
                  Mark as Closed
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="replies-section">
          <h3>Replies ({replies.length})</h3>
          
          {replies.length === 0 ? (
            <div className="no-replies">
              <p>No replies yet.</p>
            </div>
          ) : (
            <div className="replies-list">
              {replies.map((reply) => (
                <div key={reply._id} className="reply-item">
                  <div className="reply-header">
                    <span className="reply-author">{reply.author?.name}</span>
                    <span className="reply-date">{formatDate(reply.createdAt)}</span>
                  </div>
                  <div className="reply-content">
                    {reply.content}
                  </div>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmitReply} className="reply-form">
            <div className="form-group">
              <label htmlFor="reply">Add Reply</label>
              <textarea
                id="reply"
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Type your reply..."
                rows={4}
                required
              />
            </div>
            <button 
              type="submit" 
              className="submit-reply-button"
              disabled={submitting || !newReply.trim()}
            >
              {submitting ? 'Sending...' : 'Send Reply'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail; 