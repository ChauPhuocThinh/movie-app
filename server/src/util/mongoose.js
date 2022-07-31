module.exports = {
    mutipleMongooseToObject: function (mongooses) {
        return mongooses.map((Mongoose) => Mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
