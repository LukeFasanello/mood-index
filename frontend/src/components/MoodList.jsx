import { useState } from 'react';
import api from '../utils/api';

function MoodList({ moods, onMoodDeleted }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    setDeletingId(id);
    try {
      await api.delete(`/moods/${id}`);
      onMoodDeleted();
    } catch (err) {
      alert('Failed to delete mood entry');
    } finally {
      setDeletingId(null);
    }
  };

  const getMoodColor = (value) => {
    if (value >= 7) return '#4caf50'; // green
    if (value >= 3) return '#8bc34a'; // light green
    if (value >= -2) return '#ffc107'; // yellow
    if (value >= -6) return '#ff9800'; // orange
    return '#f44336'; // red
  };

  if (moods.length === 0) {
    return (
      <div className="mood-list">
        <h2>Your Mood History</h2>
        <p>No mood entries yet. Add your first one above!</p>
      </div>
    );
  }

  return (
    <div className="mood-list">
      <h2>Your Mood History</h2>
      <div className="mood-entries">
        {moods.map((mood) => (
          <div key={mood.id} className="mood-entry">
            <div className="mood-header">
              <span className="mood-date">
                {new Date(mood.entry_date).toLocaleDateString()}
              </span>
              <span 
                className="mood-value"
                style={{ backgroundColor: getMoodColor(mood.mood_value) }}
              >
                {mood.mood_value > 0 ? '+' : ''}{mood.mood_value}
              </span>
            </div>
            {mood.entry_text && (
              <p className="mood-text">{mood.entry_text}</p>
            )}
            <button
              onClick={() => handleDelete(mood.id)}
              disabled={deletingId === mood.id}
              className="delete-btn"
            >
              {deletingId === mood.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoodList;