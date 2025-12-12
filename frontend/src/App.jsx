import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import MoodForm from './components/MoodForm'
import MoodList from './components/MoodList'
import MoodChart from './components/MoodChart'
import DateRangeFilter from './components/DateRangeFilter'
import ViewMoodModal from './components/ViewMoodModal'
import EditMoodModal from './components/EditMoodModal'
import api from './utils/api'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [moods, setMoods] = useState([]);
  const [filteredMoods, setFilteredMoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('all');
  const [viewingMood, setViewingMood] = useState(null);
  const [editingMood, setEditingMood] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchMoods();
    }
  }, []);

  useEffect(() => {
    filterMoodsByDateRange();
  }, [moods, dateRange]);

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

  const filterMoodsByDateRange = () => {
    if (dateRange === 'all') {
      setFilteredMoods(moods);
      return;
    }

    const days = parseInt(dateRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const filtered = moods.filter(mood => {
      const moodDate = new Date(mood.entry_date);
      return moodDate >= cutoffDate;
    });

    setFilteredMoods(filtered);
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

  const handleDataPointClick = (mood) => {
    setViewingMood(mood);
  };

  const handleEditFromView = (mood) => {
    setViewingMood(null);
    setEditingMood(mood);
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
            {moods.length > 0 && (
              <>
                <DateRangeFilter 
                  selectedRange={dateRange} 
                  onRangeChange={setDateRange} 
                />
                <MoodChart 
                  moods={filteredMoods} 
                  onDataPointClick={handleDataPointClick}
                />
              </>
            )}
            <MoodList 
              moods={filteredMoods} 
              onMoodDeleted={fetchMoods} 
              onMoodUpdated={fetchMoods} 
            />
          </>
        )}

        {viewingMood && (
          <ViewMoodModal
            mood={viewingMood}
            onClose={() => setViewingMood(null)}
            onEdit={handleEditFromView}
          />
        )}

        {editingMood && (
          <EditMoodModal
            mood={editingMood}
            onClose={() => setEditingMood(null)}
            onMoodUpdated={fetchMoods}
          />
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