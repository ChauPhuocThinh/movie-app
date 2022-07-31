const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Actor = new Schema({
    name: { type: String, required: true },
    biography: { type: String},
    biographyVietnamese: { type: String},
    birthday: { type: Date},
    id: { type: String},
    imdb_id: { type: String},
    place_of_birth: { type: String},
    popularity: { type: Number},
    profile_path: { type: String },
    gender: {type: Number},
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Actor', Actor);
