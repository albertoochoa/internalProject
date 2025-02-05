const getHolidaysHandler = require('./getHolidaysRoute');
const createHolidayHandler = require('./postHolidaysRoute');
const updateHolidayHandler = require('./putHolidaysRoute');
const deleteHolidayHandler = require('./deleteHolidaysRoute');
const WelcomeIndex = require('./getWelcomeRoute');
const authToken = require('./authTokenRoute');

const routes = [
{
    method: 'GET', 
    path: '/getHolidays',
    handler: getHolidaysHandler.handler
},
{
    method: 'POST',
    path: '/postHolidays',
    handler: createHolidayHandler.handler
},
{
    method: 'PUT',
    path:'/putHolidays',
    handler: updateHolidayHandler.handler
},
{
    method: 'DELETE',
    path: '/deleteHolidays',
    handler: deleteHolidayHandler.handler
},
{
    method: 'GET',
    path: '/',
    handler: WelcomeIndex.handler
}, 
{
    method: 'POST',
    path: '/postAuthToken',
    handler: authToken.handler
}]
module.exports = routes;