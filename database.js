const path = require('path');
const mongoose = require('mongoose');
const postModel = require('./models/posts');

mongoose.connect('mongodb://localhost:27017/chartsDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection open");
    })
    .catch(err => {
        console.log("Error: ");
        console.log(err);
    });

users = [ {
    username:"myUser",
    password:"pass",
    number: 4
}];

async function getPosts() {
    return await postModel.find({});
}

async function findOne(id) {
    return await postModel.findOne(id);
}

function getUser(username, password) {
    var foundUser = users.find( user=> { return user.username==username && user.password==password });
    if (foundUser != undefined) {
        return foundUser;
    } else {
        return null;
    }
}

module.exports.getUser = getUser;
module.exports.getPosts = getPosts;
module.exports.findOne = findOne;