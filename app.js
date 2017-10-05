var Passport = require('passport');
var express = require('express');
var BodyParser = require('body-parser');
var CookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var session = require('cookie-session');
var App = express();

App.use(BodyParser.json());
App.use(CookieParser());
App.use(session({
    keys: ['001', '002']
}));
App.use(Passport.initialize());
App.use(Passport.session());
App.use(express.static('public'));
App.set('port', process.env.PORT || 3000);
App.set('view engine', 'ejs');
//App.configure('development',function(){
//	App.use(express.errorHandler({dumpExceptions: true, showStack: true}));
//});

//App.configure('production', function(){
//	App.use(express.errorHandler());
//});

var Account = require('./models/account');
var Admin = require('./models/admin');
Passport.use(new LocalStrategy(Admin.authenticate()));
Passport.serializeUser(Admin.serializeUser());
Passport.deserializeUser(Admin.deserializeUser());
mongoose.connect(process.env.MONGODB_URL);


require('./routes')(App);

App.listen(App.get('port'), function() {
    console.log(("Express server listening on " + App.get('port')));
});
