const Holiday = require('../models/metrics'); 

const getPageHolidaysHandler = async (request, h) => {
  try {
    const today = new Date();
    const allHolidays = await Holiday.find({});
    const upcomingHolidays = allHolidays.filter(holiday => {
      const holidayDate = new Date(holiday.date);
      console.log(holidayDate);
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
console.log('getting here, get Holidays');

