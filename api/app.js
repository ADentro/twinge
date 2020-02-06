const express = require('express');
const session = require('express-session');
// const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./services/passport')(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

/*app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);*/

app.use(session({
    secret: [keys.sessionSecret],
    resave: true,
    saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app, passport);

/*if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}*/

const PORT = process.env.PORT || 5000;
app.listen(PORT);
