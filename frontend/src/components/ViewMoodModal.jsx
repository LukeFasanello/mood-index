import { formatDate } from '../utils/dateHelpers';

function ViewMoodModal({ mood, onClose, onEdit }) {
  const getMoodColor = (value) => {
    if (value >= 7) return '#4caf50';
    if (value >= 3) return '#8bc34a';
    if (value >= -2) return '#ffc107';
    if (value >= -6) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Mood Entry</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="view-mood-content">
          <div className="view-mood-date">
            {formatDate(mood.entry_date)}
          </div>
          
          <div className="view-mood-value-container">
            <span 
              className="view-mood-value"
              style={{ backgroundColor: getMoodColor(mood.mood_value) }}
            >
              {mood.mood_value > 0 ? '+' : ''}{mood.mood_value}
            </span>
          </div>

          {mood.entry_text ? (
            <div className="view-mood-text">
              <p>{mood.entry_text}</p>
            </div>
          ) : (
            <div className="view-mood-text empty">
              <p>No notes for this day</p>
            </div>
          )}

          <div className="modal-actions">
            <button onClick={onClose} className="cancel-btn">
              Close
            </button>
            <button onClick={() => onEdit(mood)} className="save-btn">
              Edit Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMoodModal;