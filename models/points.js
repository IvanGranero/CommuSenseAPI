
const mongoose = require('mongoose');

const pointsSchema = new mongoose.Schema({
        name: Date,
        value: String
    },
    {
        _id: false
    }
);

const pointsModel = mongoose.model('pointsModel', pointsSchema);

module.exports = pointsModel;


