const Countly = require('countly-sdk-nodejs');
const dotenv = require('dotenv').config();
const path = require('path');


async function initializeCountly() {
    try {
        Countly.init({
            app_key: process.env.COUNTLY_APP_KEY,  
            server_url: process.env.COUNTLY_SERVER_URL, 
            storage_path: path.join(__dirname, '../countly_storage')  
        });

        console.log("Countly initialized successfully!");
        return Countly;  

    } catch (error) {
        console.error("Countly initialization failed:", error);
        return null;
    }
}

module.exports = { initializeCountly };