const Holiday = require('../models/metrics');
const { initializeCountly } = require('../config/counlty');

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
      console.log("Sending event to Countly:", { key: 'get_holidays', count: 1 });
      countly.add_event({ key: 'get_holidays', count: 1 });
    } else {
      console.warn("Countly instance not ready for event submission.");
    }

    return h.response(upcomingHolidays).code(200); 
  } catch (error) {
    console.error("Error in getHolidaysHandler:", error);
    return h.response({ error: 'Failed to fetch holidays' }).code(500);
  }
};

module.exports = { handler: getHolidaysHandler };























































// const Holiday = require('../models/metrics');
// const { initializeCountly } = require('../config/counlty');

// let countly = null;  

// (async () => {
//     countly = await initializeCountly();
//     if (!countly) {
//         console.error("Failed to initialize Countly. Events will not be tracked.");
//     }
// })();

// const getHolidaysHandler = async (request, h) => {
//     try {
//         const today = new Date();
//         const allHolidays = await Holiday.find({});
//         const upcomingHolidays = allHolidays.filter(holiday => {
//             const holidayDate = new Date(holiday.date);
//             return holidayDate > today;
//         });

//         if (countly) {
//             console.log("Sending event to Countly:", {
//                 key: 'get_holidays',
//                 count: 1
//             });

//             countly.add_event({
//                 key: 'get_holidays',
//                 count: 1
//             });

//             countly.add_event({
//               key: 'get_holidays',
//               count: 1
//           });
//         } else {
//             console.warn("Countly instance not ready for event submission.");
//         }

//         return h.response(upcomingHolidays).code(200); 
//     } catch (error) {
//         console.error("Error in getHolidaysHandler:", error);
//         return h.response({ error: 'Failed to fetch holidays' }).code(500);
//     }
// };

// module.exports = {
//     handler: getHolidaysHandler 
// };
