// importing the mySQL connection
const { table } = require("console");
const { query } = require("../../../01-Activities/17-CatsApp/Solved/config/connection");
var connection = require("../config/connection");

//creates the ? in a loop for new functions
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

//go back to start    
    return arr.toString();
}

//takes new objects/burgers and converts them to SQL wording/syntax
function objToSql(ob) {
    var arr = [];

for (var key in ob) {
    var value = ob[key];
    // objects might have their own properties that are hidden, so this avoids them to prevent confusion
    if (Object.hasOwnProperty.call(ob, key)) {
        // add "" around strings with spaces
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
            value = "'" + value + "'";
        }
        //pushes the devour and whether or not it's true
        arr.push(key + "=" + value);
    }
  }
// turn the array of strings into a single string
    return arr.toString();
}

//create the Object for the functions
var orm = {
    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }

            cb (result);
        });
    },

    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection,query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
  };

  //the final export to get the orm object
  // available for the model (burger.js)

  module.exports = orm;