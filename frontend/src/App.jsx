import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import MoodForm from './components/MoodForm'
import MoodList from './components/MoodList'
import MoodChart from './components/MoodChart'
import api from './utils/api'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchMoods();
    }
  }, []);

  const fetchMoods = async () => {
    setLoading(true);
    try {
      const response = await api.get('/moods');
      setMoods(response.data.moods);
    } catch (err) {
      console.error('Failed to fetch moods:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    fetchMoods();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setMoods([]);
  };

  if (isAuthenticated) {
    return (
      <div className="App">
        <div className="header">
          <h1>Mood Index</h1>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        <MoodForm onMoodAdded={fetchMoods} />
        
        {loading ? (
          <p>Loading your moods...</p>
        ) : (
          <>
            <MoodChart moods={moods} />
            <MoodList moods={moods} onMoodDeleted={fetchMoods} />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Mood Index</h1>
      <p>Track your mood every day</p>
      
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

      {showLogin ? (
        <Login onLoginSuccess={handleAuthSuccess} />
      ) : (
        <Register onRegisterSuccess={handleAuthSuccess} />
      )}
    </div>
  )
}

export default App