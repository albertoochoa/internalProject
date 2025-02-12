const Holiday = require('../models/metrics');
const { initializeCountly } = require('../config/counlty.js');

let countly = null; 
(async () => {
    countly = await initializeCountly();
    if (!countly) {
        console.error("Failed to initialize Countly. Events will not be tracked.");
    }
})();

const getHolidaysHandler = async (request, h) => {
    try {
        const today = new Date();
        const allHolidays = await Holiday.find({});
        const upcomingHolidays = allHolidays.filter(holiday => {
            const holidayDate = new Date(holiday.date);
            return holidayDate > today;
        });

        if (countly) {
            console.log("Sending event to Countly:", {
                key: 'get_holidays',
                count: 1
            });

            countly.add_event({
                key: 'get_holidays',
                count: 1
            });

            countly.flushQueue(() => {
                console.log("Event successfully sent to Countly.");
            });
        } else {
            console.warn("Countly instance not ready for event submission.");
        }

        return h.response(upcomingHolidays).code(200); 
    } catch (error) {
        console.error("Error in getHolidaysHandler:", error);
        return h.response({ error: 'Failed to fetch holidays' }).code(500);
    }
};

module.exports = {
    handler: getHolidaysHandler 
};





















































//const admin = require('firebase-admin'); 
// //const { logEvent } = require('../config/analyticsUtils.js'); 
// const Holidays = require('../models/metrics');
// //const 

// const getHolidays = async (req, res) => {
//   try {
//     const today = new Date();
//     const allHolidays = await Holidays.find({}); 
//     const upcomingHolidays = allHolidays.filter(holiday => {
//       const holidayDate = new Date(holiday.date);
//       return holidayDate > today;
//     });

//     const userId = req.user ? req.user.id : 'anonymous'; 
//     const country = req.query.country || 'unknown'; 
//     const numHolidays = upcomingHolidays.length; 

//     admin.analytics().logEvent('holiday_retrieved', {
//       user_id: userId,
//       country: country,
//       number_of_holidays: numHolidays
//     });

//     res.status(200).json(upcomingHolidays);

//   } catch (error) {
//     console.error("Error getting holidays:", error);
//     await logEvent('get_holidays_error', {
//       error_message: error.message,
//     });

//     res.status(500).json({ message: 'Error fetching holidays' });
//   }
// };

// module.exports = {
//     method: 'GET',
//     handler: getHolidays
// };


























// const Holiday = require('../models/metrics'); 

// const getPageHolidaysHandler = async (request, h) => {
//   try {
//     const today = new Date();
//     const allHolidays = await Holiday.find({});
//     const upcomingHolidays = allHolidays.filter(holiday => {
//       const holidayDate = new Date(holiday.date);

      
//       return holidayDate > today;
//     });

//     return upcomingHolidays;
//   } catch (error) {
//     console.error(error);
//     return h.response({ error: 'Failed to fetch holidays' }).code(500);
//   }
// };

// module.exports = {
//   method: 'GET',
//   handler: getPageHolidaysHandler
// };
// console.log('getting here, get Holidays');

