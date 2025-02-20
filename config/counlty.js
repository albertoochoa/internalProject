const Countly = require('countly-sdk-nodejs');
const path = require('path');
require('dotenv').config();

console.log("APP_KEY:", process.env.APP_KEY);
console.log("COUNTLY_SRVR_URL:", process.env.COUNTLY_SRVR_URL);

async function initializeCountly() {
  try {
    const storagePath = path.join(__dirname, '../countly_storage'); // Absolute path
    console.log("Storage Path:", storagePath);

    Countly.init({
      app_key: process.env.APP_KEY,
      url: process.env.COUNTLY_SRVR_URL,
      storage_path: storagePath, // Use the absolute path
      debug: true
    });

    Countly.begin_session();

    console.log("Countly initialized successfully!");
    return Countly;

  } catch (error) {
    console.error("Countly initialization failed:", error);
    return null;
  }
}

module.exports = { initializeCountly };