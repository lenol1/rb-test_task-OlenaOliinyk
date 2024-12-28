const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    firstname:{type: String, required: true, unique:true},
    lastname:{type: String, required: true, unique:true},
    picture:{type:String, required: true, unique:false},
    date: {type: Date, default: Date.now},
    date_of_modification:{type: Date, default: Date.now}
});
const chat = mongoose.model('chat', chatSchema);
module.exports = chat;