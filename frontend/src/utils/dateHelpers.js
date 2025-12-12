// Helper function to safely format dates
export const formatDate = (dateValue) => {
  if (!dateValue) return 'Invalid Date';
  
  // Extract just the date part (YYYY-MM-DD)
  const dateStr = typeof dateValue === 'string' 
    ? dateValue.split('T')[0] 
    : new Date(dateValue).toISOString().split('T')[0];
  
  // Don't add 'Z' - treat it as local time
  return new Date(dateStr + 'T12:00:00').toLocaleDateString();
};