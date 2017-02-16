const express = require('express');
const routes = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/user');

// Register
routes.post('/register',(req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({succsess: false, message: 'Failed to register user'});
        } else {
            res.json({succsess: true, message: 'User register Successfuly'});
        }
    });

});

// Authenticate
routes.post('/authenticate',(req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, message: 'User not found'});
        }
        User.ComparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 WEEK
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })

            } else {
                return res.json({success: false, message: 'Username or password incurrect'});
            }
        });
    });
});

// Profile
routes.get('/profile', passport.authenticate('jwt', {session: false}) ,(req, res, next) => {
    res.json({user: req.user});
});


module.exports = routes;