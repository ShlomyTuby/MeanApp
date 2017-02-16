const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config');



//User Schema
const UserSchema = mongoose.Schema({
    name : {
        type: 'String',
    },
    email : {
        type: 'String',
        require: true
    },
    username : {
        type: 'String',
        require: true
    },
    password : {
        type: 'String',
        require: true
    },
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    const query = { username: username }
    User.findOne(query, callback);
}

module.exports.getUserByUsername = function(_username, callback){
    User.findOne({ username: _username}, callback);
}


module.exports.addUser = function(newUser, callback){
    try{
    bcrypt.genSalt(10,(err, salt) => {
        if(err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
    } catch (err){
        callback(err);
    }
}

module.exports.ComparePassword = function(password, hash, callback){
    bcrypt.compare(password, hash, (err, isMatch) => {
        if(err) console.error(err);
        callback(null, isMatch);
    });
};