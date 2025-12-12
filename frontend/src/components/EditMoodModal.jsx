import { useState } from 'react';
import api from '../utils/api';
import { formatDate } from '../utils/dateHelpers';

function EditMoodModal({ mood, onClose, onMoodUpdated }) {
  const [moodValue, setMoodValue] = useState(mood.mood_value);
  const [entryText, setEntryText] = useState(mood.entry_text || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.put(`/moods/${mood.id}`, {
        mood_value: parseInt(moodValue),
        entry_text: entryText,
      });

      onMoodUpdated();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update mood entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Mood Entry</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date: {formatDate(mood.entry_date)}</label>
          </div>

          <div className="form-group">
            <label>Mood: {moodValue}</label>
            <input
              type="range"
              min="-10"
              max="10"
              value={moodValue}
              onChange={(e) => setMoodValue(e.target.value)}
              className="mood-slider"
            />
            <div className="mood-labels">
              <span>-10 (Terrible)</span>
              <span>0 (Neutral)</span>
              <span>+10 (Amazing)</span>
            </div>
          </div>

          <div className="form-group">
            <label>What happened?</label>
            <textarea
              value={entryText}
              onChange={(e) => setEntryText(e.target.value)}
              placeholder="Describe your day..."
              rows="4"
            />
          </div>

          {error && <div className="error">{error}</div>}

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="save-btn">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMoodModal;