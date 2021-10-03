
const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    name: String,
    text: String,
    dateTime: Date
});

const commentsModel = mongoose.model('commentsModel', commentsSchema);

module.exports = commentsModel;




