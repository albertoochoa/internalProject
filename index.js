const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db.js');
const routes = require('./handlers/routes.js');
const { initializeCountly } = require('./config/counlty.js');
const Countly = require('countly-sdk-nodejs');

let server;
let countlyInstance;

const init = async () => {
    try {
        await connectDB();

        countlyInstance = await initializeCountly();

        if (!countlyInstance) {
            console.error("Countly initialization failed. Exiting.");
            process.exit(1);
        }

        global.countlyInstance = countlyInstance;  

        server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });

        server.route(routes);

        await server.start();
        console.log('Server running on:', server.info.uri);

    } catch (error) {
        console.error('Error starting the server:', error.message);
        process.exit(1);
    }
};


process.on('SIGINT', async () => {
    if (server) {
        console.log('Stopping the server... ');
        await server.stop({ timeout: 10000 });
        console.log('Server stopped! ');
    }
    process.exit(0);
});

require('events').defaultMaxListeners = 15;  

init();
console.log('getting here, Index');
