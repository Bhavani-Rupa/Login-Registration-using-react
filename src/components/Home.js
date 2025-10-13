import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <div className="text-center fade-in">
              <h1 className="display-4 mb-4">
                <i className="bi bi-globe text-white me-3"></i>
                Welcome to UR Web
                <i className="bi bi-star-fill text-white ms-3"></i>
              </h1>
              <p className="lead text-white mb-5">
                Experience the future of web applications with our beautiful, responsive design
              </p>
            </div>
            
            {user ? (
              <div className="text-center fade-in">
                <div className="card mx-auto mb-4" style={{ maxWidth: '500px' }}>
                  <div className="card-body p-4">
                    <div className="alert alert-success mb-4">
                      <h4 className="mb-2">
                        <i className="bi bi-person-check-fill me-2"></i>
                        Welcome back, {user.username}!
                      </h4>
                      <p className="mb-0">
                        <i className="bi bi-envelope me-2"></i>
                        {user.email}
                      </p>
                    </div>
                    <button onClick={handleLogout} className="btn btn-danger btn-lg">
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-center fade-in">
                <Link to="/login" className="btn btn-primary btn-lg">
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </Link>
                <Link to="/register" className="btn btn-success btn-lg">
                  <i className="bi bi-person-plus me-2"></i>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
