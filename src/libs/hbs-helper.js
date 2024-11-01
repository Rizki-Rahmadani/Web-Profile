// Import hbs module
const hbs = require("hbs");

// Register Handlebars helper for calculating duration between dates
hbs.registerHelper("calculateDuration", (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const durationInDays = (end - start) / (1000 * 60 * 60 * 24);

  if (durationInDays > 30) {
    const months = Math.floor(durationInDays / 30);
    const days = Math.floor(durationInDays % 30);
    return `${months} bulan ${days} hari`;
  } else {
    return `${durationInDays} hari`;
  }
});

// Export hbs jika diperlukan di file lain
module.exports = hbs;
