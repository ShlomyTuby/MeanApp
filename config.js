const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');
const secret = 'OIDFJW4334HJ3647JH5F66FG763HG56PUY546JG36H99G6H34F';

module.exports = {
    database: {
        url: 'mongodb://localhost:27017/meanauth'
    },
    secret: secret,
    passport: function(passport){
        let opt = {};
        opt.jwtFromRequest = ExtractJwt.fromAuthHeader();
        opt.secretOrKey = secret;
        passport.use(new JwtStrategy(opt,(jwt_payload, done) => {
            User.findById(jwt_payload._doc._id, (err, user) => {
                if(err){
                    return done(err, false);
                }

                if(user){
                    return done(null, user);
                } else {
                    return done(null, error);
                }

            });

        }));
        
    },
}