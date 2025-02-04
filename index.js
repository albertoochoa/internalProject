const Hapi = require('@hapi/hapi');
const dotenv = require('dotenv').config();
const joi = require('joi');
const connectDB = require('./config/db.js')
const routes = require('./handlers/routes.js')

const server = new Hapi.server({
    port: 3000,
});

const init = async () => {
    try{
        await connectDB();
        server.route(routes);
        await server.start();
        console.log('Server running on: ', server.info.uri);
    }catch(error){
        console.error('Error starting the server: ', error.message);
        process.exit(1);
    }
}; 

process.on('SIGINT', async () => {
    console.log('Stopping the server... '); 
    await server.stop({timeout: 10000});
    console.log('Server stopped! ');
    process.exit(0);
})
init();
console.log('getting here, Index');
