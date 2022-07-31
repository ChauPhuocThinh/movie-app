const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Viewer = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required:true },
    accountBalance: { type: Number},
    activedEmail: {type: Boolean,default: false},
    codeActiveEmail: {type: String},
    codeConfirm: {type: String},
    monthActived: [
        {
            actived: {type: Boolean},
            activedDate: {type: Date},
            expiryDate: {type:Date}
        }
    ],
    activedVIP: [
        {
            imdbID:{type: String}, 
            date: {type: Date}
        }
    ],
    collectionFilms: [
        {   
            _id: {type: String},
            imdbID: {type: String},
            watched: {type: Boolean},
            Title: {type: String},
            TitleVietnamese: {type: String},
            Poster: {type: String},
            Type: {type: String},
            watchedAt: { type: Date, default: Date.now }
        }
    ],
    favorite: [
        {   
            _id: {type: String},
            imdbID: {type: String},
            watched: {type: Boolean},
            Title: {type: String},
            TitleVietnamese: {type: String},
            Poster: {type: String},
            Type: {type: String},
            watchedAt: { type: Date, default: Date.now }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Viewer', Viewer);
