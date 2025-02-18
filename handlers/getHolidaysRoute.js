const Joi = require('joi');
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
  const startTime = Date.now(); 

  const schema = Joi.object({});
  const { error } = schema.validate(request.payload);
  if (error) {
    return h.response({ error: 'Invalid request payload' }).code(400);
  }

  try {
    const today = new Date();
    const allHolidays = await Holiday.find({});
    const upcomingHolidays = allHolidays.filter(holiday => {
      const holidayDate = new Date(holiday.date);
      return holidayDate > today;
    });


    const responseTime = Date.now() - startTime; 
    const responseTimeInMiliSeconds = responseTime / 1000;
    if (countly) {
      console.log(`Sending event to Countly: { key: 'get_holidays', count: 1, response_time: ${responseTimeInMiliSeconds}ms }`);
      countly.add_event({
        key: 'get_holidays_usages',
        count: 1,
        segmentation: { response_time: responseTime} 
      });
    } else {
      console.warn("Countly instance not ready for event submission.");
    }

    return h.response(upcomingHolidays).code(200);
  } catch (error) {
    console.error("Error in getHolidaysHandler:", error);

    if (countly) {
      console.log("Sending error event to Countly: { key: 'get_holidays_server_error', count: 1 }");
      countly.add_event({
        key: 'get_holidays_server_error',
        count: 1
      });
    } else {
      console.warn("Countly instance not ready for event submission.");
    }

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
