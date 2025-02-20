const Joi = require('joi');
const Holiday = require('../models/metrics'); // Make sure this path is correct

const getHolidaysHandler = async (request, h) => {
    const startTime = Date.now();

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

        if (global.countlyInstance) { // Check if Countly is initialized
            console.log(`Sending event to Countly: { key: 'get_holidays', count: 1, response_time: ${responseTimeInMiliSeconds}ms }`);

            global.countlyInstance.add_event({  // Use the global instance
                key: 'get_holidays_usages',
                count: 1,
                segmentation: { response_time: responseTimeInMiliSeconds }
            }, (err) => {
                if (err) {
                    console.error("Countly Event Error:", err);
                } else {
                    console.log("Countly Event Sent (Callback)");
                }
            });
        } else {
            console.error("Countly is not initialized yet!");
        }

        return h.response(upcomingHolidays).code(200);

    } catch (error) {
        console.error("Error in getHolidaysHandler:", error);

        if (global.countlyInstance) { // Check if Countly is initialized (even in the error handler)
            global.countlyInstance.add_event({ // Use the global instance
                key: 'get_holidays_server_error',
                count: 1
            }, (err) => {
                if (err) {
                    console.error("Countly Error Event Error:", err);
                } else {
                    console.log("Countly Error Event Sent!");
                }
            });
        } else {
            console.error("Countly is not initialized yet!");
        }

        return h.response({ error: 'Failed to fetch holidays' }).code(500);
    }
};

module.exports = { handler: getHolidaysHandler };