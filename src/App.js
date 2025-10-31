// The main app layout: a top navigation bar and page content that changes by route.
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <div className="app-container">
      {/* The navigation bar shown on most pages */}
      <Navbar />
      <main className="main-content">
        {/* These routes decide which page to show based on the URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
