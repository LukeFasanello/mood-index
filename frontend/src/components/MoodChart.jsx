import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import AddMoodModal from './AddMoodModal';

function MoodChart({ moods, onDataPointClick, selectedRange, onRangeChange, onMoodAdded }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMedium, setIsMedium] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);
  const [isSmallDesktop, setIsSmallDesktop] = useState(window.innerWidth > 1024 && window.innerWidth <= 1400);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsMedium(window.innerWidth > 768 && window.innerWidth <= 1024);
      setIsSmallDesktop(window.innerWidth > 1024 && window.innerWidth <= 1400);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className="mood-chart section-container">
      <div className="chart-header-container">
        <h2 className="section-title no-border">Mood Over Time</h2>
        <button className="add-entry-btn" onClick={() => setShowAddModal(true)}>
          +
        </button>
      </div>
      <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
        <LineChart data={chartData} margin={
          isMobile ? { top: 5, right: 40, left: -45, bottom: 5 } :
          isMedium ? { top: 5, right: 70, left: -35, bottom: 5 } :
          isSmallDesktop ? { top: 5, right: 70, left: -35, bottom: 5 } :
          { top: 5, right: 5, left: -35, bottom: 5 }
        }>
          <defs>
            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4caf50" /> {/* Green at top (10) */}
              <stop offset="25%" stopColor="#8bc34a" /> {/* Light green */}
              <stop offset="50%" stopColor="#ffc107" /> {/* Yellow at middle (0) */}
              <stop offset="75%" stopColor="#ff9800" /> {/* Orange */}
              <stop offset="100%" stopColor="#f44336" /> {/* Red at bottom (-10) */}
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis domain={[-10, 10]} />
          <ReferenceLine y={0} stroke="#e0e0e0" strokeDasharray="3 3" />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className={`custom-tooltip ${isMobile ? 'mobile' : isMedium ? 'medium' : ''}`}>
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
              r: isMobile ? 8 : 6 ,
              fill: '#4295f4',
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

      <div className="chart-filters-bottom">
        <button
          className={selectedRange === 'all' ? 'active' : ''}
          onClick={() => onRangeChange('all')}
        >
          ALL
        </button>
        <button
          className={selectedRange === '1W' ? 'active' : ''}
          onClick={() => onRangeChange('1W')}
        >
          1W
        </button>
        <button
          className={selectedRange === '1M' ? 'active' : ''}
          onClick={() => onRangeChange('1M')}
        >
          1M
        </button>
        <button
          className={selectedRange === '3M' ? 'active' : ''}
          onClick={() => onRangeChange('3M')}
        >
          3M
        </button>
        <button
          className={selectedRange === '1Y' ? 'active' : ''}
          onClick={() => onRangeChange('1Y')}
        >
          1Y
        </button>
      </div>

      {stats && (
        <div className="insights-section section-container">
          <h2 className="section-title">Insights</h2>
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
        </div>
      )}

      {showAddModal && (
        <AddMoodModal
          onClose={() => setShowAddModal(false)}
          onMoodAdded={() => {
            setShowAddModal(false);
            onMoodAdded();
          }}
        />
      )}
    </div>
  );
}

export default MoodChart;