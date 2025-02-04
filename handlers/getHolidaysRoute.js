const HolidaySchema = require('../models/metrics');

const getPageHolidaysHandler = async (request, h) => {
    try {
        const today = new Date();
        const allHolidays = await HolidaySchema.find({}); 

        const upcomingHolidays = allHolidays.filter(holiday => { 
            const holidayDate = new Date(holiday.Date); 
            return holidayDate > today; 
        });

        return upcomingHolidays;    
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Failed to fetch holidays' }).code(500);
    }
};

module.exports = {
    method: 'GET',
    handler: getPageHolidaysHandler
};
