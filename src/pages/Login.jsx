import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BookOpen } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials or server error.');
    }
  };

  return (
    <div className="auth-container min-h-screen">
      <div style={{ textAlign: 'center' }}>
        <BookOpen size={48} color="var(--brand-600)" style={{ margin: '0 auto' }} />
        <h2 style={{ fontSize: '1.875rem', fontWeight: 800, marginTop: '1.5rem', color: 'var(--text-main)' }}>
          Placement Resource Hub
        </h2>
        <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
          Sign in to your account
        </p>
      </div>

      <div className="auth-box">
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary w-full" style={{ marginTop: '1rem' }}>
            Sign In
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
          <Link to="/register" style={{ fontWeight: 500, color: 'var(--brand-600)' }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
