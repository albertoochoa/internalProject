const Countly = require('countly-sdk-nodejs');
const dotenv = require('dotenv').config();
const path = require('path');

async function initializeCountly() {
    try {
        Countly.init({
            app_key: process.env.APP_KEY,  
            url: process.env.COUNTLY_SRVR_URL,  
            storage_path: path.join(__dirname, '../countly_storage')
        });

        Countly.begin_session();
        console.log("Countly initialized successfully!");
        setInterval(() => {
            if (Countly.q) {
                Countly.q.push(['track']);
                console.log("Sent queued events to Countly.");
            } else {
                console.warn("Countly queue is not initialized.");
            }
        }, 10000);

        return Countly;

    } catch (error) {
        console.error("Countly initialization failed:", error);
        return null;
    }
}

module.exports = { initializeCountly };
