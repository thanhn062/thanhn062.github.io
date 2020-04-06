var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root".
  pasword: "123",
  database: "employee_DB"
});
