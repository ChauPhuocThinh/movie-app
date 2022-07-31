const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Infor = new Schema({
    hotFilms2Day : [
        {
            imdbID: {type:String},
            views: {type:Number, default: 1},

        }
    ],
});

module.exports = mongoose.model('Infor', Infor);
