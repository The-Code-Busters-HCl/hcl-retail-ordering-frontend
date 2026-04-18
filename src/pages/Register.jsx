import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // ✅ alert state added
  const [showAlert, setShowAlert] = useState(false);

  // ✅ single state for entire form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  console.log('Form Data:', formData);

  try {
    const response = await axios.post(
      'http://localhost:8080/api/signup',
      formData
    );

    // ✅ success (same behavior)
    setShowAlert(true);

    setTimeout(() => {
      navigate('/login');
    }, 2000);

  } catch (error) {
    console.error(error);
    alert('Error: Unable to register'); // unchanged behavior
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container mt-5">
      <div className="col-md-6 mx-auto">
        <div className="card p-4 shadow">

          <h2 className="text-center mb-4">Register</h2>

          {/* ✅ Bootstrap Alert */}
          {showAlert && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              User registered successfully! Please login now.
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowAlert(false)}
              ></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                className="form-control"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Register;