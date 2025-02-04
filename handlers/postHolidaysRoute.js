const Holiday = require('../models/metrics');

const createHolidayHandler = async (request, h) => {
    try {
        const { name, date, description } = request.payload;

        if (!name || !date) {
            return h.response({ error: 'Name and date are required fields.' }).code(400);
        }

        const newHoliday = new Holiday({
            name,
            date,
            description
        });

        const savedHoliday = await newHoliday.save();
        console.log(savedHoliday.toJSON());
        return h.response(savedHoliday.toJSON()).code(201); 
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return h.response({ error: 'Holiday with the same name or date already exists.' }).code(409);
        }

        return h.response({ error: 'Failed to create holiday.' }).code(500);
    }
};

module.exports = {
    method: 'POST',
    handler: createHolidayHandler
};
