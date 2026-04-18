import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('token', 'fake-jwt-token');
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-sm mt-5">
          <div className="card-body p-4">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" required defaultValue="demo@example.com" />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" required defaultValue="password123" />
              </div>
              <button disabled={loading} type="submit" className="btn btn-primary w-100">
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
