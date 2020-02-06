const dbConnection = require('../dbConnection');

module.exports = function getUser(app) {
    app.get('/users/add', (req, res) => {
        let user = {
            authentication_provider: 'google',
            email: `aarondentro@gmail.com`,
            oauth_id: `69inthebedroom007intheboardroom`,
            username: `adentro`
        };
        const INSERT_USER_QUERY =
            'INSERT INTO users (authentication_provider, dob, email, oauth_id, username) VALUES (${user.authentication_provider}, NOW(), ${user.email}, ${user.oauth_id}, ${user.username})';
        dbConnection.query(INSERT_USER_QUERY, user, (err, result) => {
            if (err) {
                throw err;
            }
            else {
                console.log(result);
                res.send('User added...');
            }
        });
    });
};
