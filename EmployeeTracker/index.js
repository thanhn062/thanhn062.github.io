var mysql = require("mysql");
var inquirer = require("inquirer");



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
      case "Add Employee":
        addEmployee();
        break;
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
async function addEmployee() {
  var { first_name } = await inquirer.prompt({
    message: "Enter employee's first name:",
    name: "first_name"
  });
  console.log(first_name);
  var { last_name } = await inquirer.prompt({
    message: "Enter employee's last name:",
    name: "last_name"
  });
  console.log(last_name);
  var { role } = await inquirer.prompt({
    message: "Pick employee's role:",
    name: "role",
    type: "list",
    choices: [
      "Sales person",
      "Sales Lead",
      "Software Engineer",
      "Accountant",
      "Lead Engineer",
      "Lawyer",
      "Legal Team Lead"
    ]
  });
  console.log(role);
  // Convert choices into ID
  var role_id = 0;
  if (role == "Sales Lead") role_id = 1;
  else if (role == "Sales person") role_id = 2;
  else if (role == "Lead Engineer") role_id = 3;
  else if (role == "Software Engineer") role_id = 4;
  else if (role == "Accountant") role_id = 5;
  else if (role == "Legal Team Lead") role_id = 6;
  else if (role == "Lawyer") role_id = 7;
  console.log(role_id);
  // Get manager id
  var { manager_id } = await inquirer.prompt({
    message: "Enter employee's manager's ID:",
    type: "input",
    name: "manager_id"
  });
  if (!manager_id)
    manager_id = "null";
  console.log(manager_id);
  // Run SQL query to add the employee
  connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}","${last_name}",${role_id},${manager_id})`, (err, res) => {
    if (err) throw err;
      console.log("Employee added !")
    viewMenu();
  });
}



/*



 function getEmpInfo() {
    // Get Employee's name
     inquirer.prompt([
       {
         message: "Enter employee's first name:",
         name: "first_name"
       },
       {
         message: "Enter employee's last name:",
         name: "last_name"
       },
       {
         message: "Employee's department:",
         name: "department",
         type: "list",
         choices: [
           "Sales",
           "Engineering",
           "Finance",
           "Legal"
         ]
       }
     ]);
  }
/*
console.log(department);
console.log(name);
function addRole() {

}
function addDepartment() {

}
function updateEmpRole() {

}

// Pick department


      var { manager_id } = await
        inquirer.prompt({
          message: "Employee's manager ID:",
          name: "manager_id",
          type: "input"
        });
        return name, role_id, manager_id;
}
*/
