const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    vehicleid: {
        type: String,
        trim: true,
        unique: true,
        require: true
    },
    type: {
        type: String,
        enum: ['4seater', '7seater', 'truck'],
        default: ''
    },
    checkin: {
        type: Date,
        default: ''
    },
    checkout: {
        type: Date,
        default: ''
    },
    fuelcharge: {
        type: {
            fuelType: {
                type: String,
                enum: ['gasoline', 'diesel']
            },
            amount: {
                type: Number
            }
        },
        default: {}
    },
    changeoil: {
        type: Boolean,
        default: false
    },
    washing: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
    },
});

const Vehicle = mongoose.model('Vehicle', VehicleSchema)
module.exports = Vehicle;
