const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Adjusts to local time
};

module.exports = { convertTimestamp };
