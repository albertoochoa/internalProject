const Countly = require('countly-sdk-nodejs');

async function initializeCountly() {
    try {
        const countly = Countly; 
        const fs = require('fs');
        const storagePath = './countly_storage'; 

        if (!fs.existsSync(storagePath)) {
            fs.mkdirSync(storagePath);
        }

        await countly.init({
            app_key: 'YOUR_APP_KEY',  
            server_url: 'YOUR_SERVER_URL', 
            storagePath: storagePath
        });

        console.log("Countly initialized successfully!");
        return countly;
    } catch (error) {
        console.error("Countly initialization failed:", error);
        return null;
    }
}

module.exports = {
    initializeCountly
};
