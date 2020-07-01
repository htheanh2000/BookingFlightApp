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
        required: true
    },
    dPurchase: {
        type: Date,
        required:true
    }
})

const Bill = mongoose.model('bill', billSchema);

module.exports = Bill;