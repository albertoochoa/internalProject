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
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id;    
            delete ret.__v;    
        }
    },
    id: false 
});

const Holiday = mongoose.model('Holiday', HolidaySchema);
module.exports = Holiday;
