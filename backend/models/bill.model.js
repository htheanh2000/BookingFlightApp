let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let billSchema = new Schema({
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
    },
    dPurchase
})

const Bill = mongoose.model('bill', billSchema);
Module.export = Bill;