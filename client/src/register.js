import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');  // New state for email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setSuccess(null);
      return;
    }

    try {
      // Send registration data to the backend
      const response = await axios.post('http://localhost:3001/api/v1/user/register', {
        username,
        email,  // Send email along with username and password
        password,
      });

      // If registration is successful, navigate to dashboard page
      setSuccess('Registration successful! You will be redirected to the dashboard.');
      setError(null);
      
      // Redirect to the dashboard after 2 seconds
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      // Display error message if registration fails
      setError(error.response?.data?.message || 'An error occurred, please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Register</h2>
          
          {/* Display success message */}
          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}
          
          {/* Display error message */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>  {/* New Email Field */}
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>

          <p className="mt-3 text-center">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
