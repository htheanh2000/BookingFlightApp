let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let flighSchema = new Schema({
    // Mã chuyến bay | Flight ID 
    flightID: {
        type: String,
        require: true
    },
    // tên chuyến bay | Flight Name 
    flightName: {
        type: String,
        require: true
    },
    // Ngày khởi hành | Departure date
    departureDate: {
        type: Date,
        required: true
    },
    // Ngày tới | Arrival date 
    flightTime: {
        type: Number,
        required: true
    },
    // Nơi đến | arrivalLocation
    arrivalLocation: {
        type: String,
        required: true,
    },
    // Nơi đi | departureLocation
    departureLocation: {
        type: String,
        required: true,
    },
    // Gía vé | Airfares
    airfares: {
        type: Number,
        required: true,
    }
})

const Flight = mongoose.model('flight', flighSchema);

module.exports = Flight;