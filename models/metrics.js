const mongoose = require('mongoose');

const HolidaySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        unique: true
    }, 
    date: {
        type: String, 
        required: true,
        unique: true,
    },
    description: {
        type: String
    }
});
const Holiday = mongoose.model('Holiday', HolidaySchema);
module.exports = Holiday;