const cron = require('node-cron');
const ActOfKindness = require('../../models/actOfKindness');

// Schedule the cleanup task to run every day at 2 AM
cron.schedule('0 2 * * *', async () => {
  // Define the time threshold for deleting the test data (e.g., 7 days ago)
  const threshold = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  // Delete the test data older than the threshold
  await ActOfKindness.deleteMany({ testData: true, createdAt: { $lt: threshold } });
});
