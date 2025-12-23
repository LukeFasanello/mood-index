import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="App">
        <h1>
          <span className="letter-m">M</span>
          <span className="letter-o1">o</span>
          <span className="letter-o2">o</span>
          <span className="letter-d">d</span>
          {' '}<span className="index-text">Index</span>
        </h1>
        <p>Track your mood every day</p>

        {showLogin ? (
          <Login onLoginSuccess={handleAuthSuccess} />
        ) : (
          <Register onRegisterSuccess={handleAuthSuccess} />
        )}

        <div className="auth-toggle">
          <button
            className={showLogin ? 'active' : ''}
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button
            className={!showLogin ? 'active' : ''}
            onClick={() => setShowLogin(false)}
          >
            Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="header">
        <h1>
          <span className="letter-m">M</span>
          <span className="letter-o1">o</span>
          <span className="letter-o2">o</span>
          <span className="letter-d">d</span>
          {' '}<span className="index-text">Index</span>
        </h1>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/history" className="nav-link">History</Link>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="page-wrapper">
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;