import { useState } from 'react';
import api from '../utils/api';

function MoodForm({ onMoodAdded }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [moodValue, setMoodValue] = useState(0);
  const [entryText, setEntryText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  console.log('=== FRONTEND DEBUG ===');
  console.log('Date input value:', date);
  console.log('Sending to backend:', {
    entry_date: date,
    mood_value: parseInt(moodValue),
    entry_text: entryText,
  });

  try {
    await api.post('/moods', {
      entry_date: date,  // Just send the date string directly
      mood_value: parseInt(moodValue),
      entry_text: entryText,
    });

    // Reset form
    setDate(new Date().toISOString().split('T')[0]);
    setMoodValue(0);
    setEntryText('');
    
    onMoodAdded();
  } catch (err) {
    setError(err.response?.data?.error || 'Failed to add mood entry');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="mood-form">
      <h2>Add Mood Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Entry'}
        </button>
      </form>
    </div>
  );
}

export default MoodForm;