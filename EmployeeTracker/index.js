var mysql = require("mysql");
var inquirer = require("inquirer");
var util = require("util");
// Database information
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  pasword: "",
  database: "employee_db"
});
// Promisify query
const query = util.promisify(connection.query).bind(connection);
// Global variables
var departments = [];
var managers = [];
var roles = [];
var role_id;

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
      case "Add Employee":
        addEmployee();
        break;
      case "Add Role":
        addRole();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Update Employee Role":
        updateEmpRole();
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
  SELECT role.id,role.title,role.salary,department.name as department
  FROM role
  LEFT JOIN department ON (department.id = role.department_id)
  `;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    viewMenu();
  });
}
async function addEmployee() {
  // -- GET EMPLOYEE'S FULL NAME --
  var { first_name } = await inquirer.prompt({
    message: "Enter employee's first name:",
    name: "first_name"
  });
  var { last_name } = await inquirer.prompt({
    message: "Enter employee's last name:",
    name: "last_name"
  });

  // -- PICK EMPLOYEE'S ROLE --

  // Get all titles from role table
  var allRole = await query("SELECT title FROM role");

  // empty global roles array
  roles = [];

  // Add  roles into array roles[]
  for (var i = 0; i < allRole.length; i++) {
    roles.push(allRole[i].title);
  };

  // Show all available role in database
  var { role } = await inquirer.prompt(
    {
    message: "Pick employee's role:",
    name: "role",
    type: "list",
    choices: roles
  });
  // Find role's id by role's name
  role = await query(`SELECT id FROM role WHERE title="${role}"`);

  // -- PICK EMPLOYEE'S MANAGER --

  // Get a list with all employees
  var allEmp = await query(`SELECT CONCAT(id, " ", first_name, " ",  last_name) AS name FROM employee`);

  // Add none option into the manager list
  allEmp.push("None");

  // Add  employees into allEmp array
  managers =[];
  for (var i = 0; i < allEmp.length; i++) {
    managers.push(allEmp[i].name);
  };

  // Pick employee's manager
  var { manager } = await inquirer.prompt(
    {
      message: "Pick employee's manager:",
      name: "manager",
      type: "list",
      choices: allEmp
    });


  // Get employee's id
  const employee = manager.split(" ");

  var manager_id = employee[0];

  // If pick None
  if (employee[0] == "None")
    manager_id = "null";

  console.log(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}","${last_name}",${role[0].id},${manager_id})`);
  // Run SQL query to add the employee
  await connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}","${last_name}",${role[0].id},${manager_id})`, (err, res) => {
    if (err) throw err;
      console.log("Employee added !")
    viewMenu();
  });
}
async function addRole() {
  // Set empty variables
  departments =  [];

  var { title } = await inquirer.prompt({
    message: "Enter role's title:",
    name: "title"
  });
  var { salary } = await inquirer.prompt({
    message: "Enter role's salary:",
    name: "salary"
  });
  // Add all existing departments into choice
  await connection.query("SELECT name FROM department", (err, ans) => {
  ans.forEach((item, i) => {
    departments.push(item.name);
  });

  inquirer.prompt({
    message: "Pick role's department:",
    type: "list",
    name: "department",
    choices: departments
  }).then(ans => {
    // find department_id of the picked department
    connection.query(`SELECT id FROM department WHERE name="${ans.department}"`, (err, ans) => {
      var department_id = ans[0].id;
      connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${title}",${salary},${department_id})`, (err) => {
        console.log("Role added !");
        viewMenu();
      });
    });
  });
  });
}
async function addDepartment() {
  var { name } = await inquirer.prompt({
    message: "Enter department's name:",
    name: "name"
  });
  await connection.query(`INSERT INTO department (name) VALUES ("${name}")`, (err) => {
    if (err)
      console.log(err);
    console.log("Department added !");
    viewMenu();
  });
}
async function updateEmpRole() {

  // Pick employee to update
  var allEmp = await query((`SELECT CONCAT(id , " ", first_name, " ",  last_name) AS name FROM employee`));
  var { employee } = await inquirer.prompt({
    message: "Choose an employee to update role:",
    name: "employee",
    type: "list",
    choices: allEmp
  });

  // Search for employee's id

  // Get first name & last name
  var name = employee.split(" ");
  // Search by first & last name
  var employee = await query(`SELECT id FROM employee where first_name="${name[0]}" AND last_name="${name[1]}"`);
  // Get first result in case theres
  console.log(employee);
}
