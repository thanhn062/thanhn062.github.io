var mysql = require("mysql");
var inquirer = require("inquirer");
const util = require("util");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  pasword: "",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // Initial menu
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [
        "View Employees",
        "View Departments",
        "View Roles",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Role"
      ]
    }
  ]).then(res => {
    switch (res.choice) {
      case "View Employees":
        viewEmployees();
        break;
      case "View Department":
        //viewDepartment();
      default:

      }
  });
});

function viewEmployees() {
  var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id AS manager FROM employee LEFT JOIN role ON (employee.role_id = role.id) LEFT JOIN department ON (role.department_id = department.id)";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
}
