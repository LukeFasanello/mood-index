import { useState, useEffect } from 'react';
import MoodList from '../components/MoodList';
import api from '../utils/api';

function HistoryPage() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMoods();
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

  return (
    <div>
      {loading ? (
        <p>Loading your history...</p>
      ) : (
        <MoodList 
          moods={moods} 
          onMoodDeleted={fetchMoods} 
          onMoodUpdated={fetchMoods} 
        />
      )}
    </div>
  );
}

export default HistoryPage;