import { useState, useEffect } from 'react';
import MoodForm from '../components/MoodForm';
import MoodChart from '../components/MoodChart';
import DateRangeFilter from '../components/DateRangeFilter';
import ViewMoodModal from '../components/ViewMoodModal';
import EditMoodModal from '../components/EditMoodModal';
import api from '../utils/api';

function HomePage() {
  const [moods, setMoods] = useState([]);
  const [filteredMoods, setFilteredMoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState('1M');
  const [viewingMood, setViewingMood] = useState(null);
  const [editingMood, setEditingMood] = useState(null);

  useEffect(() => {
    fetchMoods();
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

    const daysMap = {
      '1W': 7,
      '1M': 30,
      '3M': 90,
      '1Y': 365
    };

    const days = daysMap[dateRange];
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const filtered = moods.filter(mood => {
      const moodDate = new Date(mood.entry_date);
      return moodDate >= cutoffDate;
    });

    setFilteredMoods(filtered);
  };

  const handleDataPointClick = (mood) => {
    setViewingMood(mood);
  };

  const handleEditFromView = (mood) => {
    setViewingMood(null);
    setEditingMood(mood);
  };

  return (
    <div>
      {loading ? (
        <p>Loading your moods...</p>
      ) : (
        <>
          {moods.length > 0 && (
            <div className="chart-section">
              <MoodChart
                moods={filteredMoods}
                onDataPointClick={handleDataPointClick}
                selectedRange={dateRange}
                onRangeChange={setDateRange}
                onMoodAdded={fetchMoods}
              />
            </div>
          )}
          
          <MoodForm onMoodAdded={fetchMoods} />
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

export default HomePage;