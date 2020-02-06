const dbConnection = require('../dbConnection');


module.exports = function getUser(app) {
    app.get('/getuser/:id', (req, res) => {
        let sql = `SELECT * FROM users WHERE oauth_id = ${req.params.id}`;
        let query = dbConnection.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    });
};
