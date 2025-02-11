const Countly = require('countly-sdk-nodejs');
const dotenv = require('dotenv').config();
const path = require('path');

async function initializeCountly() {
    try {
        Countly.init({
            app_key: process.env.APP_KEY,  
            server_url: process.env.COUNTLY_SRVR_URL,  
            storage_path: path.join(__dirname, '../countly_storage')
        });
        Countly.debug_mode = true;
        setInterval(() => {
            if (Countly && Countly.q) {
                Countly.q.push(['fetch_remote_config']);
                console.log("Forcing event submission to Countly...");
            } else {
                console.warn("Countly instance not ready for event submission.");
            }
        }, 10000);

        console.log("Countly initialized successfully!");
        return Countly;  

    } catch (error) {
        console.error("Countly initialization failed:", error);
        return null;
    }
}

module.exports = { initializeCountly };
