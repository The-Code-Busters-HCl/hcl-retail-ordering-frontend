import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
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
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" required placeholder="John Doe" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" required placeholder="name@example.com" />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" required placeholder="Create a password" />
              </div>
              <button disabled={loading} type="submit" className="btn btn-primary w-100 mb-3">
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
              <div className="text-center">
                <span className="text-muted">Already have an account? </span>
                <Link to="/login" className="text-decoration-none">Log in</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
