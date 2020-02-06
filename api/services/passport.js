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

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

module.exports = (passport) => {

    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        connection.query("SELECT * FROM users WHERE oauth_id = ? ", [id], (err, rows) => {
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
                connection.query('SELECT * FROM users WHERE oauth_id = ?', [profile.id], (err, rows) => {
                    console.log('search user');
                    if (err) {
                        return done(err);
                    }
                    if (rows.length) {
                        console.log('user found');
                        return done(null, rows[0]);
                    } else {
                        let user = {
                            provider_id: profile.id,
                            username: profile.username,
                            provider: profile.provider,
                            email: profile.emails.value,
                            dob: Date.now()
                        };
                        console.log('adding user');
                        const insertQuery = "INSERT INTO users (username, authentication_provider, oauth_id, email, dob) values (?,?,?,?,?)";
                        connection.query(insertQuery, [user.username, user.provider, user.provider_id, user.email, user.dob], (err, rows) => {
                            //user.id = rows.id;
                            return done(null, user);
                        });
                    }
                });
            })
    );
};




