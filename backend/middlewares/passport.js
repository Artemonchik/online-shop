const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const {sequelize, User} = require('../models/index');
const bcrypt = require('bcrypt');

const options = {
    usernameField: 'email',
    passwordField: 'password'
};

passport.use('local', new LocalStrategy(options, (email, password, done) => {
    bcrypt.hash(password, 8).then(async hash => {
        try {
            const user = await User.findOne({
                where:
                    {
                        email: email,
                    }
            });
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            }

            return done(null, false);
        } catch (err) {
            done(err);
        }
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await User.findOne({
            where:
                {id: userId}
        });
        done(null, user)
    } catch (err) {
        done(err)
    }
});


module.exports = passport;
