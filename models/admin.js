var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportMongoose = require('passport-local-mongoose');

var Admin = new Schema({
    username: String,
    password: String
});

Admin.plugin(passportMongoose);

module.exports = mongoose.model('Admin', Admin);