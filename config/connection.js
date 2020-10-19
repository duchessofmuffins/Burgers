//first set up the mySQL connection
var mysql = requre ("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "burgers_db"
});

//connect the two and direct a thrown error if it fails
connection.connect(function(err) {
    if (err) {
        console.error("error connection: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

//export so the connection can be used by the ORM
module.exports = connection;