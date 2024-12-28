const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{type: String, required: false, unique:false},
    lastname:{type:String, required:false, unique:false},
    username: {type: String, required: true, unique: true,},
    email: {type: String, required: true, unique: true,},
    picture: {type: String, required: true, unique: true,},
    date: {type: Date, default: Date.now,},
});
const user = mongoose.model('users', userSchema);
user.createIndexes();
module.exports = user;