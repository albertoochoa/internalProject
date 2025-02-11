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
            Countly.send_events();
            console.log("Forcing event submission to Countly...");
        }, 10000); 

        console.log("Countly initialized successfully!");
        return Countly;  

    } catch (error) {
        console.error("Countly initialization failed:", error);
        return null;
    }
}

module.exports = { initializeCountly };
