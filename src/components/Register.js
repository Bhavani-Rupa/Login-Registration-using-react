// The registration form: collects user info and creates an account using the mock service.
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Whenever the user types, clear errors and update the password strength indicator
    setError('');
    // Check how strong the current password looks
    setPasswordStrength(getPasswordStrength(password));
  }, [username, email, phone, password, confirmPassword]);

  const getPasswordStrength = (password) => {
    if (password.length < 6) return 'weak';
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) return 'medium';
    return 'strong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic checks to help the user fill the form correctly
    if (!username || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      setIsLoading(false);
      return;
    }
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      setError('Invalid phone number (10 digits required)');
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    if (passwordStrength === 'weak') {
      setError('Password is too weak');
      setIsLoading(false);
      return;
    }

    try {
      // Ask our mock service to create a new user account
      const data = await authService.register({ username, email, phone, password });
      
      if (data.success) {
        alert('Registration successful!');
        navigate('/login');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7 col-sm-9">
            <div className="card fade-in">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <i className="bi bi-person-plus-circle text-success" style={{ fontSize: '3rem' }}></i>
                  <h2 className="card-title mt-3 mb-2">Create Account</h2>
                  <p className="text-muted">Join us today and get started</p>
                </div>
                
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="username" className="form-label">
                      <i className="bi bi-person me-2"></i>Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      <i className="bi bi-envelope me-2"></i>Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="form-label">
                      <i className="bi bi-phone me-2"></i>Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      <i className="bi bi-lock me-2"></i>Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                    {password && (
                      <div className="form-text">
                        <i className="bi bi-shield-check me-1"></i>
                        Strength: <span className={`text-${passwordStrength === 'strong' ? 'success' : passwordStrength === 'medium' ? 'warning' : 'danger'}`}>
                          {passwordStrength.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="confirm-password" className="form-label">
                      <i className="bi bi-lock-fill me-2"></i>Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-success w-100 mb-3" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Registering...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        Register
                      </>
                    )}
                  </button>
                </form>
                
                <div className="text-center">
                  Already have an account? <Link to="/login" className="text-decoration-none fw-bold">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
