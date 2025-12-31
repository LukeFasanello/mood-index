import { useState, useEffect, useRef, useCallback } from 'react';
import MoodForm from '../components/MoodForm';
import MoodChart from '../components/MoodChart';
import DateRangeFilter from '../components/DateRangeFilter';
import ViewMoodModal from '../components/ViewMoodModal';
import EditMoodModal from '../components/EditMoodModal';
import api from '../utils/api';

function HomePage() {
  const [moods, setMoods] = useState([]);
  const [filteredMoods, setFilteredMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('1M');
  const [viewingMood, setViewingMood] = useState(null);
  const [editingMood, setEditingMood] = useState(null);
  const abortControllerRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const isMountedRef = useRef(true);
  const hasInitiallyLoadedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    fetchMoods();

    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    filterMoodsByDateRange();
  }, [moods, dateRange]);

  const fetchMoods = useCallback(async () => {
    // Clear any pending debounced calls
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Only show loading on initial load, not on subsequent fetches
    if (!hasInitiallyLoadedRef.current) {
      setLoading(true);
    }

    // Debounce the actual API call
    debounceTimerRef.current = setTimeout(async () => {
      if (!isMountedRef.current) return;

      abortControllerRef.current = new AbortController();

      try {
        const response = await api.get('/moods', {
          signal: abortControllerRef.current.signal
        });

        if (isMountedRef.current) {
          setMoods(response.data.moods);
          hasInitiallyLoadedRef.current = true;
        }
      } catch (err) {
        if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
          console.log('Request was cancelled');
        } else if (isMountedRef.current) {
          console.error('Failed to fetch moods:', err);
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    }, 150); // 150ms debounce delay
  }, []);

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
    const now = new Date();
    const cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - days);

    const filtered = moods.filter(mood => {
      const dateStr = mood.entry_date.split('T')[0];
      const moodDate = new Date(dateStr + 'T12:00:00');
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
          <div className="chart-section">
            <MoodChart
              moods={filteredMoods}
              onDataPointClick={handleDataPointClick}
              selectedRange={dateRange}
              onRangeChange={setDateRange}
              onMoodAdded={fetchMoods}
            />
          </div>

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