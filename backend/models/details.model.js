let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let detailSchema = new Schema({
    billID: {
        type: String,
        required: true,
        unique: true,
    },
    userID: {
        type: String,
        required: true
    },
    billCost: {
        type: Number,
        required: true,
    }
})

const Detail = mongoose.model('detail', detailSchema);
Module.export = Detail;