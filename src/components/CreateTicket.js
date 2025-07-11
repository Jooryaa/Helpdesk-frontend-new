import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTicket.css';

const CreateTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await axios.post('/tickets', {
        title: title.trim(),
        description: description.trim()
      });

      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create ticket');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="create-ticket-container">
      <div className="create-ticket-card">
        <div className="create-ticket-header">
          <h1>Create New Ticket</h1>
          <button onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="create-ticket-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter ticket title"
              required
              maxLength={100}
            />
            <span className="char-count">{title.length}/100</span>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue or request"
              required
              rows={6}
              maxLength={1000}
            />
            <span className="char-count">{description.length}/1000</span>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={handleCancel} 
              className="cancel-form-button"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading || !title.trim() || !description.trim()}
            >
              {loading ? 'Creating...' : 'Create Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket; 