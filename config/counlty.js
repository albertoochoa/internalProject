const Countly = require('countly-sdk-nodejs');
const path = require('path');
require('dotenv').config();

async function initializeCountly() {
  try {
    Countly.init({
      app_key: process.env.APP_KEY,
      url: process.env.COUNTLY_SRVR_URL, 
      storage_path: path.join(__dirname, '../countly_storage'),
      //debug: true                       
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
