import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Helpdesk Login</h1>
        <p className="subtitle">Mini Helpdesk Ticketing System</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="test-credentials">
          <h3>Test Credentials:</h3>
          <div className="credentials-list">
            <div><strong>Admin:</strong> admin@fakeeh.edu.sa / admin123</div>
            <div><strong>User1:</strong> user1@fakeeh.edu.sa / pass123</div>
            <div><strong>User2:</strong> user2@fakeeh.edu.sa / pass123</div>
            <div><strong>User3:</strong> user3@fakeeh.edu.sa / pass123</div>
            <div><strong>User4:</strong> user4@fakeeh.edu.sa / pass123</div>
            <div><strong>User5:</strong> user5@fakeeh.edu.sa / pass123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 