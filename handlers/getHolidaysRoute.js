const Joi = require('joi');
const Holiday = require('../models/metrics'); 
const { initializeCountly } = require('../config/counlty');

let countlyPromise = initializeCountly();

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

        const countly = await countlyPromise; // Await initialization

        if (countly) { // Check if Countly is ready
            console.log(`Sending event to Countly: { key: 'get_holidays', count: 1, response_time: ${responseTimeInMiliSeconds}ms }`);

            countly.add_event({
                key: 'get_holidays_usages',
                count: 1,
                segmentation: { response_time: responseTimeInMiliSeconds }
            }, (err) => { // Callback for error handling
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

        const countly = await countlyPromise; // Await even in error handler

        if (countly) {
            countly.add_event({
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