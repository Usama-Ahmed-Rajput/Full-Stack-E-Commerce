// Format number as Pakistani Rupees (PKR / Rs.)
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'Rs. 0';
  }
  const formatted = new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: 0
  }).format(amount);
  
  return `Rs. ${formatted}`;
};

// Format ISO date string into readable text
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
