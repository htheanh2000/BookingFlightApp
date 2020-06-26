let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
   userID: {
       type: String,
       required: true,
       unique: true,
   },
   userName: {
       type: String,
       required: true
   },
   userEmail: {
       type: String,
        required: true
   },
   // Birthday
   userBday: {
        type: Date,
        required: true
   },
   userPhoneNum: {
        type: String,
        required: true,
   }
})

const User = mongoose.model('user', userSchema);

module.exports = User;