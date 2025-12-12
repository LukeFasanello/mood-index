import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function MoodChart({ moods, onDataPointClick }) {
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
    console.log('Dot clicked with data:', data);
    if (data && data.fullMood) {
      onDataPointClick(data.fullMood);
    }
  };

  return (
    <div className="mood-chart">
      <h2>Mood Over Time</h2>
      <p className="chart-hint">Click on any point to view details</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
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
            stroke="#646cff" 
            strokeWidth={3}
            dot={{ 
              fill: '#646cff', 
              r: 6, 
              stroke: '#fff',
              strokeWidth: 2,
              cursor: 'pointer',
              onClick: (e, payload) => {
                console.log('Line dot onClick:', e, payload);
                handleDotClick(payload.payload);
              }
            }}
            activeDot={{ 
              r: 8,
              onClick: (e, payload) => {
                console.log('Active dot onClick:', e, payload);
                handleDotClick(payload.payload);
              }
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MoodChart;