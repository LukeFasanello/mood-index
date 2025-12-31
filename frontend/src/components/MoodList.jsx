import { useState, useRef, useEffect } from 'react';
import api from '../utils/api';
import EditMoodModal from './EditMoodModal';
import { formatDate } from '../utils/dateHelpers';

const ENTRIES_PER_PAGE = 10;

function MoodList({ moods, onMoodDeleted, onMoodUpdated }) {
  const [deletingId, setDeletingId] = useState(null);
  const [editingMood, setEditingMood] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [displayCount, setDisplayCount] = useState(ENTRIES_PER_PAGE);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleDelete = async (id) => {
    setOpenMenuId(null);
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

  const handleEdit = (mood) => {
    setOpenMenuId(null);
    setEditingMood(mood);
  };

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + ENTRIES_PER_PAGE);
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
      <div className="mood-list section-container">
        <h2 className="section-title">Your Mood History</h2>
        <p>No mood entries yet. Add your first one on the home page!</p>
      </div>
    );
  }

  const displayedMoods = moods.slice(0, displayCount);
  const hasMore = displayCount < moods.length;

  return (
    <div className="mood-list section-container">
      <h2 className="section-title">Your Mood History</h2>
      <div className="mood-entries">
        {displayedMoods.map((mood) => (
          <div key={mood.id} className="mood-entry">
            <div className="mood-menu-container" ref={openMenuId === mood.id ? menuRef : null}>
              <button
                onClick={() => toggleMenu(mood.id)}
                className="mood-menu-btn"
                aria-label="More options"
              >
                ⋮
              </button>
              {openMenuId === mood.id && (
                <div className="mood-dropdown-menu">
                  <button
                    onClick={() => handleEdit(mood)}
                    className="mood-dropdown-item"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mood.id)}
                    disabled={deletingId === mood.id}
                    className="mood-dropdown-item delete"
                  >
                    {deletingId === mood.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              )}
            </div>
            <div className="mood-header">
              <span className="mood-date">
                {formatDate(mood.entry_date)}
              </span>
              <span
                className="mood-value"
                style={{ backgroundColor: getMoodColor(mood.mood_value) }}
              >
                {mood.mood_value}
              </span>
            </div>
            {mood.entry_text && (
              <p className="mood-text">{mood.entry_text}</p>
            )}
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="load-more-btn">
            Load More
          </button>
        </div>
      )}

      {editingMood && (
        <EditMoodModal
          mood={editingMood}
          onClose={() => setEditingMood(null)}
          onMoodUpdated={onMoodUpdated}
        />
      )}
    </div>
  );
}

export default MoodList;