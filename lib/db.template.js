var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'',  // mysql user ex)root
    password:'',  // mysql password
    database:'shopping_mall'  // database name
});
db.connect();
module.exports = db;