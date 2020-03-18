const inquirer = require("inquirer");
const fs = require('fs');
const util = require("util");

// Employee
class Employee  {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
  getName() {return this.name}
  getId() {return this.id}
  getEmail() {return this.email}
  getRole() {return "Employee"}
};

// Manager
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
  getRole() {return "Manager"}
}
// Engineer
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }
  getGithub() {return this.github}
  getRole() {return "Manager"}
}
// Intern
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }
  getSchool() {return this.school}
  getRole() {return "Manager"}
}
// Create empty array for engineers & interns
var engineers = [];
var interns = [];
console.log("Let's put together an engineer team.");
inquirer.prompt([
  {
    type: "input",
    message: "An engineer team MUST have a manager, enter the manager's name:",
    name: "name",
  },
  {
    type: "input",
    message: "Enter manager's ID:",
    name: "id",
  },
  {
    type: "input",
    message: "Enter manager's email:",
    name: "email",
  },
  {
    type: "input",
    message: "Enter manager's officer number:",
    name: "officeNumber",
  }
]).then(function(ans) {
  // Create manager instance
  var manager = new Manager(ans.name, ans.id, ans.email, ans.officeNumber);
  addMember();
});


function addMember() {
  inquirer.prompt({
    type: "list",
    message: "Do you want to add more Engineer or Intern into the team ?",
    name: "choice",
    choices: ["Engineer","Intern","No"]
  }).then(function(ans) {
      if (ans.choice === "Engineer") {
        addEngineer();
      }
      else if (ans.choice === "Intern") {
        addIntern();
      }
      else if (ans.choice === "No") {
        return;
      }
  });
}
function addEngineer() {
  inquirer.prompt([
  {
    type: "input",
    message: "Enter the engineer's name:",
    name: "name",
  },
  {
    type: "input",
    message: "Enter engineer's ID:",
    name: "id",
  },
  {
    type: "input",
    message: "Enter engineer's email:",
    name: "email",
  },
  {
    type: "input",
    message: "Enter engineer github:",
    name: "github",
  }
  ]).then(function(ans) {
    // Add new engineer to the array
    var engineer = {
      name: ans.name,
      id: ans.id,
      email: ans.email,
      github: ans.github
    }
    engineers.push(engineer);
    addMember();
  });
}

function addIntern() {
  inquirer.prompt([
  {
    type: "input",
    message: "Enter the intern's name:",
    name: "name",
  },
  {
    type: "input",
    message: "Enter intern's ID:",
    name: "id",
  },
  {
    type: "input",
    message: "Enter intern's email:",
    name: "email",
  },
  {
    type: "input",
    message: "Enter intern's school:",
    name: "school",
  }
  ]).then(function(ans) {
  // Add new intern to the array
  var intern = {
    name: ans.name,
    id: ans.id,
    email: ans.email,
    school: ans.school
  }
  engineers.push(intern);
  addMember();
  });
}
module.exports = Manager;
module.exports = Intern;
module.exports = Engineer;
module.exports = Employee;

// Hire new employee
//var emp_1 = new Employee("Thanh", 0, "510thanh.ngo@gmail.com");
//var emp_2 = new Manager("Thu", 1, "anhtng042020@yahoo.com", 999);

//console.log(emp_1.getRole());
//console.log(emp_2.getRole());
//console.log(emp_2.officeNumber);
