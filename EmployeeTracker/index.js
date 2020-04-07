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
  viewMenu();
});

function viewMenu() {
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
      case "View Departments":
        viewDepartments();
        break;
      case "View Roles":
        viewRoles();
        break;
      default:

      }
  });
}
function viewEmployees() {
  var query = `
  SELECT employee.id, employee.first_name, employee.last_name, role.title,
  department.name AS department, role.salary, CONCAT(e2.first_name," ",e2.last_name) AS manager
  FROM employee
  LEFT JOIN role
  ON (employee.role_id = role.id)
  LEFT JOIN department
  ON (role.department_id = department.id)
  LEFT JOIN employee e2
  ON employee.manager_id = e2.id`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    viewMenu();
  });
}
function viewDepartments() {
  var query = `SELECT * FROM department`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    viewMenu();
  });
}
function viewRoles() {
  var query = `
  SELECT role.id,role.title,department.name as department
  FROM role
  LEFT JOIN department ON (department.id = role.department_id)
  `;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    viewMenu();
  });
}
function addEmployee() {

}
function addRole() {

}
function addDepartment() {

}
function updateEmpRole() {
  
}
