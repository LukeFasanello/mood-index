import { useState } from 'react';
import DatePicker from 'react-datepicker';
import api from '../utils/api';

function AddMoodModal({ onClose, onMoodAdded }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moodValue, setMoodValue] = useState(0);
  const [entryText, setEntryText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];

      await api.post('/moods', {
        entry_date: formattedDate,
        mood_value: parseInt(moodValue),
        entry_text: entryText,
      });

      onMoodAdded();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add mood entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Mood Entry</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              maxDate={new Date()}
              dateFormat="MM/dd/yyyy"
              className="date-picker-input"
              required
            />
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
            <label>What happened today?</label>
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
              {loading ? 'Adding...' : 'Add Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMoodModal;
