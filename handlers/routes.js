const getHolidaysHandler = require('./getHolidaysRoute');
const createHolidayHandler = require('./postHolidaysRoute');
const updateHolidayHandler = require('./putHolidaysRoute');
const deleteHolidayHandler = require('./deleteHolidaysRoute');

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
}]
module.exports = routes;