let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let detailSchema = new Schema({
    detailID: {
        type: String,
        required: true,
        unique: true,
    },
    billID: {
        type: String,
        required: true,
        unique: true,
    },
    flightID: {
        type: String,
        required: true
    },
    num:{
        type: String,
        required: true
    },
    billCost: {
        type: Number,
        required: true,
    }
})

const Detail = mongoose.model('detail', detailSchema);
module.exports = Detail;