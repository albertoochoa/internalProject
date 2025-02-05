const Holiday = require('../models/metrics');

const deleteHolidayHandler = async (request, h) => {
    try {
        const { name } = request.payload; 

        if (!name) {
            return h.response({ error: 'Holiday name is required in the request body.' }).code(400);
        }
        const deletedHoliday = await Holiday.findOneAndDelete({ name });
        if (!deletedHoliday) {
            return h.response({ error: 'Holiday not found.' }).code(404);
        }
        return h.response({
            message: 'Holiday deleted successfully.',
            holiday: deletedHoliday
        }).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Failed to delete holiday.' }).code(500);
    }
};

module.exports = {
    method: 'DELETE',
    handler: deleteHolidayHandler
};
