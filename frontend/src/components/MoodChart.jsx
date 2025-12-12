import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function MoodChart({ moods }) {
  if (moods.length === 0) {
    return null;
  }

  // Sort moods by date and format for chart
  const chartData = moods
    .sort((a, b) => new Date(a.entry_date) - new Date(b.entry_date))
    .map(mood => ({
      date: new Date(mood.entry_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: mood.mood_value,
      fullDate: mood.entry_date,
      text: mood.entry_text
    }));

  return (
    <div className="mood-chart">
      <h2>Mood Over Time</h2>
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
                    {payload[0].payload.text && (
                      <p className="tooltip-text">{payload[0].payload.text}</p>
                    )}
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
            strokeWidth={2}
            dot={{ fill: '#646cff', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MoodChart;