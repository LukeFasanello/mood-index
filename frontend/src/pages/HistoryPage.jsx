import { useState, useEffect, useRef, useCallback } from 'react';
import MoodList from '../components/MoodList';
import api from '../utils/api';

function HistoryPage() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
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