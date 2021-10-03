const mongoose = require('mongoose');
const chartModel = require('./charts');
const commentsModel = require('./comments');

const postSchema = new mongoose.Schema({
    author: String,
    text: String,
    chart: [ chartModel.schema ],
    comments: [commentsModel.schema]
});

const postModel = mongoose.model('postModel', postSchema);

module.exports = postModel;