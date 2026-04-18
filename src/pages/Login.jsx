import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("Password@123");
  const [error, setError] = useState("");

  // ✅ Strong Password Validation
  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    if (!/[A-Z]/.test(password)) {
      return "Must include at least one uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Must include at least one lowercase letter";
    }

    if (!/[0-9]/.test(password)) {
      return "Must include at least one number";
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return "Must include at least one special character (!@#$%^&*)";
    }

    if (/\s/.test(password)) {
      return "Password must not contain spaces";
    }

    return "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ✅ Validate password before API call
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password
      });

      // ✅ Save token
      localStorage.setItem('token', response.data.token);

      // ✅ Redirect after login
      navigate('/dashboard');

    } catch (err) {
      console.error(err);

      // Better error handling
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Server not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-sm mt-5">
          <div className="card-body p-4">
            <h2 className="text-center mb-4">Login</h2>

            {/* ❗ Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleLogin}>
              
              {/* 📧 Email */}
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* 🔒 Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {/* 💡 Password Rules UI */}
                <small className="text-muted">
                  Password must contain:
                  <ul className="mb-0">
                    <li>At least 8 characters</li>
                    <li>1 uppercase & 1 lowercase letter</li>
                    <li>1 number</li>
                    <li>1 special character (!@#$%^&*)</li>
                    <li>No spaces</li>
                  </ul>
                </small>
              </div>

              {/* 🔘 Button */}
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary w-100"
              >
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