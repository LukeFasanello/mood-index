function DateRangeFilter({ selectedRange, onRangeChange }) {
  const ranges = [
    { value: 'all', label: 'All Time' },
    { value: '7', label: 'Last 7 Days' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'Last 90 Days' },
  ];

  return (
    <div className="date-range-filter">
      {ranges.map((range) => (
        <button
          key={range.value}
          className={selectedRange === range.value ? 'active' : ''}
          onClick={() => onRangeChange(range.value)}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}

export default DateRangeFilter;