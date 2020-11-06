var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'',  // mysql user ex)root
    password:'',  // mysql password
    database:''  // database name ex)shopping_mall
});
db.connect();
module.exports = db;