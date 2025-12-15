import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function MoodChart({ moods, onDataPointClick, selectedRange, onRangeChange }) {
  if (moods.length === 0) {
    return null;
  }

  // Sort moods by date and format for chart
  const chartData = moods
    .sort((a, b) => new Date(a.entry_date) - new Date(b.entry_date))
    .map(mood => ({
      date: new Date(mood.entry_date.split('T')[0] + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: mood.mood_value,
      fullMood: mood
    }));

  const handleDotClick = (data) => {
    if (data && data.fullMood) {
      onDataPointClick(data.fullMood);
    }
  };

  // Calculate statistics
  const calculateStats = () => {
    if (moods.length === 0) return null;

    const moodValues = moods.map(m => m.mood_value);
    const average = (moodValues.reduce((a, b) => a + b, 0) / moodValues.length).toFixed(1);
    const highest = Math.max(...moodValues);
    const lowest = Math.min(...moodValues);

    // Calculate best/worst day of week
    const dayOfWeekMoods = {};
    moods.forEach(mood => {
      const date = new Date(mood.entry_date.split('T')[0] + 'T12:00:00');
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      if (!dayOfWeekMoods[dayName]) {
        dayOfWeekMoods[dayName] = [];
      }
      dayOfWeekMoods[dayName].push(mood.mood_value);
    });

    const dayAverages = {};
    Object.keys(dayOfWeekMoods).forEach(day => {
      const avg = dayOfWeekMoods[day].reduce((a, b) => a + b, 0) / dayOfWeekMoods[day].length;
      dayAverages[day] = avg;
    });

    const sortedDays = Object.entries(dayAverages).sort((a, b) => b[1] - a[1]);
    const bestDay = sortedDays.length > 0 ? sortedDays[0][0] : 'N/A';
    const worstDay = sortedDays.length > 0 ? sortedDays[sortedDays.length - 1][0] : 'N/A';

    return {
      average,
      highest,
      lowest,
      bestDay,
      worstDay,
      totalEntries: moods.length
    };
  };

  const stats = calculateStats();

  return (
    <div className="mood-chart">
      <div className="chart-header">
        <h2>Mood Over Time</h2>
        <div className="chart-filters">
          <button 
            className={selectedRange === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => onRangeChange('all')}
          >
            All Time
          </button>
          <button 
            className={selectedRange === '7' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => onRangeChange('7')}
          >
            7 Days
          </button>
          <button 
            className={selectedRange === '30' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => onRangeChange('30')}
          >
            30 Days
          </button>
          <button 
            className={selectedRange === '90' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => onRangeChange('90')}
          >
            90 Days
          </button>
        </div>
      </div>
      <p className="chart-hint">Click on any point to view details</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4caf50" /> {/* Green at top (10) */}
              <stop offset="25%" stopColor="#8bc34a" /> {/* Light green */}
              <stop offset="50%" stopColor="#ffc107" /> {/* Yellow at middle (0) */}
              <stop offset="75%" stopColor="#ff9800" /> {/* Orange */}
              <stop offset="100%" stopColor="#f44336" /> {/* Red at bottom (-10) */}
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[-10, 10]} />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="custom-tooltip">
                    <p><strong>{payload[0].payload.date}</strong></p>
                    <p>Mood: {payload[0].value}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line 
            type="monotone" 
            dataKey="mood" 
            stroke="url(#moodGradient)"
            strokeWidth={3}
            dot={false} // Remove all dots by default
            activeDot={{ 
              r: 4,
              fill: '#646cff',
              stroke: '#fff',
              strokeWidth: 2,
              cursor: 'pointer',
              onClick: (e, payload) => {
                handleDotClick(payload.payload);
              }
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      {stats && (
        <div className="mood-stats">
          <div className="stat-item">
            <span className="stat-label">Average</span>
            <span className="stat-value">{stats.average}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Highest</span>
            <span className="stat-value positive">{stats.highest}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Lowest</span>
            <span className="stat-value negative">{stats.lowest}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Best Day</span>
            <span className="stat-value">{stats.bestDay}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Worst Day</span>
            <span className="stat-value">{stats.worstDay}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Entries</span>
            <span className="stat-value">{stats.totalEntries}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodChart;