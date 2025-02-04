const Holiday = require('../models/metrics');

const updateHolidayHandler = async (request, h) => {
    try {
        const { name, newName, date, description } = request.payload; 

        if (!name) {
            return h.response({ error: 'Current holiday name is required in the request body.' }).code(400);
        }

        if (!newName && !date && !description) {
            return h.response({ error: 'At least one field (newName, date, or description) is required to update.' }).code(400);
        }

        const updateFields = {};
        if (newName) updateFields.name = newName;
        if (date) updateFields.date = date;
        if (description) updateFields.description = description;

        const updatedHoliday = await Holiday.findOneAndUpdate(
            { name }, 
            { $set: updateFields }, 
            { new: true, runValidators: true } 
        );

        if (!updatedHoliday) {
            return h.response({ error: 'Holiday not found.' }).code(404);
        }

        return h.response(updatedHoliday).code(200); 
    } catch (error) {
        console.error(error);

        if (error.code === 11000) {
            return h.response({ error: 'Holiday with the same name or date already exists.' }).code(409);
        }

        return h.response({ error: 'Failed to update holiday.' }).code(500);
    }
};

module.exports = {
    method: 'PUT',
    handler: updateHolidayHandler
};
