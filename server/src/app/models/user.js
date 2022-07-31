const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required:true },
    phoneNumber: { type: String},
    avatar: {type: String},
    address: {type: String},
    ID: {type: String},
    dateofBirth: {type: Date},
    role: {type: String},
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', User);
