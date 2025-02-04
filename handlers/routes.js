const getHolidaysHandler = require('./getHolidaysRoute');
const createHolidayHandler = require('./postHolidaysRoute');
const updateHolidayHandler = require('./putHolidaysRoute');
const deleteHolidayHandler = require('./deleteHolidaysRoute');
const WelcomeIndex = require('./getWelcomeRoute');

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
}]
module.exports = routes;