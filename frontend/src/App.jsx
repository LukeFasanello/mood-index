import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import About from './pages/About';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.nav-links') && !event.target.closest('.hamburger-menu')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <ScrollToTop />
      {!isAuthenticated ? (
        <Routes>
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={
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
          } />
        </Routes>
      ) : (
        <>
          <div className="header">
            <h1>
              <Link to="/" className="title-link">
                <span className="letter-m">M</span>
                <span className="letter-o1">o</span>
                <span className="letter-o2">o</span>
                <span className="letter-d">d</span>
                {' '}<span className="index-text">Index</span>
              </Link>
            </h1>
            <button
              className="hamburger-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
            <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/history" className="nav-link" onClick={() => setMobileMenuOpen(false)}>History</Link>
              <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="logout-btn mobile-logout">Logout</button>
            </nav>
            <button onClick={handleLogout} className="logout-btn desktop-logout">Logout</button>
          </div>

          <div className="page-wrapper">
            <div className="App">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>

          <footer className="app-footer">
            <div className="footer-links">
              <Link to="/terms" className="footer-link">Terms of Service</Link>
              <span className="footer-separator">|</span>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            </div>
          </footer>
        </>
      )}
    </Router>
  );
}

export default App;