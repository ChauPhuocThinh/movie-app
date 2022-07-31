const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Film = new Schema({
    Title: { type: String, required: true },
    TitleVietnamese: { type: String, required: true },
    Type: { type: String },
    Year: { type: String, maxLength: 255 },
    Source: { type: String, maxLength: 255 },
    YearNumber: {type:Number},
    Trailer: { type: String, maxLength: 255 },
    Rated: { type: String, maxLength: 255 },
    Released: { type: Date, maxLength: 255 },
    Runtime: { type: Number },
    Genre: { type: String, maxLength: 255 },
    Director: { type: String, maxLength: 255 },
    Writer: { type: String, maxLength: 255 },
    Actors: { type: String, maxLength: 255 },
    Plot: { type: String, maxLength: 255 },
    PlotVietnamese: { type: String, maxLength: 255 },
    Language: { type: String, maxLength: 255 },
    Country: { type: String, maxLength: 255 },
    Poster: { type: String, maxLength: 255 },
    imdbRating: { type: Number },
    imdbID: { type: String, maxLength: 255 },
    Backdrop: { type: String, maxLength: 255 },
    imdbVotes: { type: String, maxLength: 255 },
    Status: { type: String, maxLength: 255},
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Film', Film);
