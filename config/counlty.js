const Countly = require('countly-sdk-nodejs');
const dotenv = require('dotenv').config();
const path = require('path');


async function initializeCountly() {
    try {
        await new Promise((resolve) => {
            Countly.init({
                app_key: process.env.APP_KEY,  
                server_url: process.env.COUNTLY_SRVR_URL,  
                storage_path: path.join(__dirname, '../countly_storage')
            });

            console.log("Countly initialized successfully!");
            resolve();
        });

        setInterval(() => {
            if (Countly) {
                Countly.flushQueue(() => {
                    console.log("Flushed Countly event queue.");
                });
            }
        }, 10000);

        return Countly;

    } catch (error) {
        console.error("Countly initialization failed:", error);
        return null;
    }
}

module.exports = { initializeCountly };
