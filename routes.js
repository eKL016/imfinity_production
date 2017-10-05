var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('./models/account');
var Admin = require('./models/admin');
passport.use(new LocalStrategy(Admin.authenticate()));
module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    });
    app.get('/index', function(req, res) {
        res.render('index');
    });
    app.get('/index-1', function(req, res) {
        res.render('index-1');
    });
    app.route('/register')
        .get(function(req, res) {
            res.render('register');
        })
        .post(function(req, res) {
            var password = req.body.password;
            req.body.pId = password;
            delete req.body.password;
            Account.register(new Account(req.body), password, function(err, account) {
                if (err) {
                    console.log(new Date() + ' ' + err);
                    return res.json({msg:err});
                } else {
                    console.log('學員' + account.username + ' 已於 ' + new Date() + ' 報名');
                }
                return res.json({msg:"success"});
            });
        });
    app.route('/check')
        .post(function(req, res) {
                Account.findByUsername(req.body.email, function(err, account) {
                if (!account) {
                    res.json({
                        msg: "notExisted"
                    });
                } else {
                    account.authenticate(req.body.password, function(err, account) {
                        if (account) res.json({
                            msg: "existed"
                        });
                        else res.json("notExisted");
                    })
                }
            })
        });
    app.route('/list')
        .get(function(req, res) {
            if (req.user) {
                var accounts = {};
                Account.find({}, function(err, users) {
                    users.forEach(function(user) {
                        console.log(user);
                        accounts[user._id.toString()] = user;
                    })
                    return res.json(accounts);
                });
            } else {
                res.status(401).redirect('/');
            }
        })
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res) {
            res.json({
                msg: "adminLoggedIn"
            });
        });
    app.post('/adminReg', function(req, res) {
        Admin.register(new Admin({
            username: req.body.username
        }), req.body.password, function(err, admin) {
            if (err) res.send(err);
            else res.send("An admin has been created");
        })
    });
    app.get('/adminLogout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};
