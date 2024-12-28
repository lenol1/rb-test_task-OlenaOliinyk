const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chat: {type: mongoose.Schema.Types.ObjectId, ref: 'chat', required: true, unique: false},
    text: {type: String, required: true, unique:false},
    person: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true, unique: false},
    autoAnswer: {type: Number, required:false, unique: false},
    date: {type: Date, default: Date.now},
    date_of_modification:{type: Date, default: Date.now}
});
const Message = mongoose.model('message', messageSchema);
module.exports = Message;