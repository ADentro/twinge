const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const getUser = require('../sql/users/getUser');
//const insertUser = require('../sql/users/insertUser');
const mysql = require('mysql');
const keys = require('../config/keys');


const connection = mysql.createConnection({
    host: 'localhost',
    user: keys.mySQLUser,
    password: keys.mySQLPassword,
    database: 'twinge'
});

/*connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});*/

exports.searchUser = (profile, done) => {
    connection.query('SELECT * FROM users WHERE oauth_id = ?' [profile.id], (err, user) => {
        if (err) {
            return done(err);
        }
        if (user.length > 0) {
            return done(null, false);
        } else {
            return insertUser(profile, done);
        }
    })
};

insertUser = (profile, done) => {
    connection.query('INSERT INTO users (username, authentication_provider, oauth_id, email, dob) VALUES (?, ?, ?, ?, ?)', [profile.displayName, profile.provider, profile.oauth_id, profile.emails.value, Date.now()],
        (err, user) => {
            if (err) {
                return done(err);
            }
            getUser(profile, done);
        })
};

getUser = (profile, done) => {
    connection.query('SELECT * FROM users WHERE oauth_id = ?' [profile.id], (err, user) => {
        if (err) {
            return done(err);
        }
        done(null, (user.length === 1) ? user[0] : false);
    })
};


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    connection.query("SELECT * FROM users WHERE oauth_id = " + id, (err, rows) => {
        done(err, rows[0]);
    });
});

passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            connection.searchUser(profile, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                console.log('...' + JSON.stringify(user));
                return done(null, user);
            })
        }
    )
);
